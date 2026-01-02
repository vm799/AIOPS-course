# Lesson 5: Causal Inference in Operations

**Duration:** 17 minutes
**Learning Objectives:**
- Distinguish correlation from causation in telemetry data
- Apply causal inference techniques to root cause analysis
- Build causal graphs for complex distributed systems
- Avoid common causality fallacies in incident investigation

---

## The Correlation vs Causation Problem

**Famous Example:**
```
Observation: Ice cream sales correlate with drowning deaths (r = 0.87)
Naive conclusion: Ice cream causes drowning
Reality: Both caused by summer weather (confounding variable)
```

**Operations Equivalent:**
```
Observation: CPU usage correlates with error rate (r = 0.82)
Naive conclusion: High CPU causes errors
Possible realities:
  1. High CPU causes errors (causal)
  2. Errors cause high CPU (reverse causation)
  3. Traffic spike causes both (confounding)
  4. Pure coincidence (spurious)
```

**Why it matters:** Treating symptoms instead of root causes wastes time and doesn't prevent recurrence.

---

## Correlation ≠ Causation

### Correlation

**Definition:** Two variables change together in a predictable pattern

**Measurement:** Pearson correlation coefficient (r)
- **r = 1.0:** Perfect positive correlation
- **r = 0.0:** No correlation
- **r = -1.0:** Perfect negative correlation

**Example:**
```python
# Latency increases when error rate increases
latency = [120, 145, 189, 234, 298]  # milliseconds
errors =  [2, 5, 8, 12, 18]  # count
correlation = 0.94  # Strong correlation
```

**Problem:** Correlation tells you **"these move together"** but not **"which causes which"** or **"if either causes anything"**

### Causation

**Definition:** One variable directly influences another through a mechanism

**Requirements for causation:**
1. **Temporal precedence:** Cause precedes effect in time
2. **Covariation:** Cause and effect correlate
3. **Mechanism:** Explainable causal pathway
4. **No confounders:** Third variable isn't the real cause

**Example:**
```
Database connection pool exhaustion → API timeout errors

Evidence:
1. Temporal: Pool exhaustion (02:15:00) precedes errors (02:15:03) ✓
2. Covariation: Pool utilization correlates with error rate (r=0.91) ✓
3. Mechanism: No available connections → requests queue → timeout ✓
4. No confounders: Traffic load stable, no deployments ✓

Conclusion: Pool exhaustion CAUSES errors
```

---

## Common Causality Fallacies

### 1. Post Hoc Ergo Propter Hoc
**Translation:** "After this, therefore because of this"

**Fallacy:** A preceded B, therefore A caused B

**Example:**
```
14:00 - Deploy new code
14:18 - Error rate spikes

Assumption: Deployment caused errors
Reality: AWS hypervisor degradation started 14:15 (deployment coincidental)
```

**How to avoid:** Check for confounding events in same time window

### 2. Reverse Causation
**Fallacy:** Assuming direction of causality without evidence

**Example:**
```
Observation: High memory usage correlates with slow queries
Naive: Memory pressure causes queries to slow down
Reality: Slow queries cause memory buildup (query results cached)
```

**How to avoid:** Examine temporal ordering (which happens first?)

### 3. Spurious Correlation
**Fallacy:** Correlation between unrelated variables

**Classic Example:**
```
Correlation: US spending on science vs suicides by hanging (r=0.99)
Reality: Pure coincidence (no mechanism)
```

**Operations Example:**
```
Correlation: London office lights-on time vs Tokyo server load (r=0.78)
Reality: Both follow global business hours (common cause: time zones)
```

**How to avoid:** Demand plausible mechanism before claiming causation

### 4. Confounding Variables
**Fallacy:** Ignoring hidden common cause

**Example:**
```
Observation: Deployments correlate with incidents (r=0.74)
Naive: Deployments cause incidents
Reality: Both caused by feature release deadlines (confounding pressure)
  - Rushed code → more bugs
  - Tight deadlines → more deployments
```

**How to avoid:** Ask "what third factor could cause both?"

---

## Building Causal Graphs

### Directed Acyclic Graphs (DAGs)

**Structure:**
- **Nodes:** Variables (metrics, events)
- **Edges:** Causal relationships (A → B means "A causes B")
- **Direction:** Arrow shows cause → effect

**Example: Memory Leak Cascade**
```
Code Bug (memory leak)
    ↓
Memory Usage Increases
    ↓
Garbage Collection Frequency
    ↓
CPU Usage Spikes
    ↓
Request Latency Increases
    ↓
Thread Pool Exhaustion
    ↓
Error Rate Spikes
```

**Intervention Point:** Fixing code bug (root) prevents entire cascade

### Real-World Example: Microservices Cascade

```
Product Catalog DB Connection Leak
    ↓
Connection Pool Exhaustion (catalog service)
    ↓
Catalog API Latency Increases
    ├──→ Shopping Cart Timeouts (hard dependency)
    ├──→ Recommendation Engine Failures (soft dependency)
    └──→ Search Service Degradation (async dependency)
         ↓
     User Experience Degradation
         ↓
     Revenue Loss
```

**Key Insight:** Identifying "Connection Pool Exhaustion" as intermediate cause allows:
1. **Immediate mitigation:** Scale pool (treats symptom, buys time)
2. **Root cause fix:** Patch connection leak (prevents recurrence)

---

## Causal Inference Techniques

### 1. Granger Causality Test

**Principle:** If X "Granger-causes" Y, past values of X help predict future Y

**Operational Use:**
```python
# Test: Does CPU usage predict error rate?
if past_cpu_values → future_error_rate_prediction_improves:
    CPU likely causes errors (or common cause exists)
else:
    Correlation is spurious or reverse causation
```

**Limitation:** Only shows predictive power, not true causation

### 2. Controlled Experiments (Chaos Engineering)

**Principle:** Deliberately inject cause, observe effect

**Example: Netflix Chaos Monkey**
```
Experiment: Randomly terminate EC2 instances
Hypothesis: Auto-scaling will maintain availability
Observation: Latency spike < 500ms, full recovery in 12 seconds
Conclusion: Auto-scaling causally prevents outages from instance failure
```

**Benefit:** Proves causation through controlled intervention

### 3. Time-Series Analysis

**Technique:** Cross-correlation with time lag

**Example:**
```
Correlation at lag 0: r = 0.45 (weak)
Correlation at lag 3 min: r = 0.89 (strong)

Interpretation: X causes Y with 3-minute delay
```

**Use case:** Identifying how long deployment takes to impact error rate

### 4. Bayesian Networks

**Approach:** Probabilistic causal model

**Example:**
```
P(Error | Deployment) = 0.23
P(Error | ¬Deployment) = 0.04

Conclusion: Deployments increase error probability 5.75× (causal)
```

**Benefit:** Quantifies causal strength, not just presence/absence

---

## Root Cause Analysis (RCA) Framework

### Step 1: Establish Timeline
**Goal:** Determine temporal ordering of events

**Method:**
```
14:00:00 - Deployment started (canary 20%)
14:03:00 - Memory usage begins trending up (catalog service)
14:08:00 - First connection timeout error logged
14:12:00 - Error rate visible in user-facing metrics
14:15:00 - Alerts fire (CPU spike)
```

**Key Question:** What was the **earliest** deviation from baseline?
**Answer:** Memory usage (14:03), not errors (14:08)

### Step 2: Identify Correlations
**Goal:** Find variables that move together

**Method:**
```python
correlate_metrics(time_window=[14:00, 14:15], threshold=0.7)

Results:
- Memory usage ↔ Connection pool utilization (r=0.94)
- Connection pool ↔ Error rate (r=0.88)
- CPU usage ↔ GC frequency (r=0.82)
```

### Step 3: Build Causal Hypothesis
**Goal:** Explain mechanism

**Hypothesis:**
```
Deployment introduced memory leak →
  Memory usage increases →
    GC runs more frequently →
      CPU spikes during GC →
        Requests queued during GC →
          Connection pool saturates →
            New requests timeout →
              Error rate increases
```

**Test:** Does this explain ALL observed correlations?

### Step 4: Validate with Evidence
**Goal:** Confirm or refute hypothesis

**Evidence Types:**
1. **Logs:** Connection pool exhaustion messages (supports hypothesis)
2. **Code review:** Memory leak in new deployment (supports hypothesis)
3. **Metrics:** CPU spikes align with GC events (supports hypothesis)
4. **Experiment:** Rollback deployment → error rate drops (PROVES causation)

### Step 5: Eliminate Confounders
**Goal:** Rule out alternative explanations

**Checks:**
- **Traffic spike?** No (request rate stable)
- **External dependency degradation?** No (third-party APIs healthy)
- **Infrastructure issue?** No (AWS status page clear)
- **DDoS attack?** No (request pattern normal)

**Conclusion:** Deployment is root cause (no confounders found)

---

## AIOps & Causal Inference

### Dynatrace Davis AI

**Capability:** Automated causation engine

**How it works:**
1. **Topology mapping:** Understands service dependencies
2. **Anomaly detection:** Identifies deviations from baseline
3. **Causal graph construction:** Links anomalies via dependency paths
4. **Root cause ranking:** Scores causes by probability

**Example Output:**
```
Root Cause: Database connection leak in catalog-service
Confidence: 89%
Causal Chain:
  catalog-service (memory leak)
    → Connection pool exhaustion
    → API timeouts
    → Shopping cart failures
    → Revenue impact
```

**Benefit:** Seconds instead of 45 minutes for RCA

---

## Practical RCA Example

### Scenario: API Latency Spike

**Observation:** API p95 latency increases from 240ms to 1,200ms at 14:12

**Step 1: Timeline**
```
14:00 - Normal operations
14:03 - Database CPU increases 65% → 78%
14:08 - Cache hit rate decreases 94% → 61%
14:12 - API latency spike begins
14:15 - Error rate increases 0.4% → 3.2%
```

**Step 2: Correlations**
```
- DB CPU ↔ Cache misses (r=0.92)
- Cache misses ↔ API latency (r=0.87)
- API latency ↔ Error rate (r=0.79)
```

**Step 3: Causal Hypotheses**

**Hypothesis A:** DB CPU causes cache misses
- **Mechanism:** High CPU → slow queries → cache evictions
- **Problem:** No evidence cache evictions occurred

**Hypothesis B:** Cache misses cause DB CPU
- **Mechanism:** Cache invalidation → more DB queries → CPU load
- **Evidence:** Cache hit rate dropped BEFORE DB CPU increased (temporal precedence) ✓

**Hypothesis C:** Common cause (deployment)
- **Mechanism:** New code queries wrong cache keys → misses → DB load
- **Evidence:** Deployment 14:00 precedes all symptoms ✓

**Step 4: Validation**
```
Code review: New feature queries cache with user_id instead of session_id (typo)
  → Cache always misses (wrong key)
    → Every request hits database
      → DB CPU spikes
        → Slow queries
          → API latency increases

Experiment: Rollback deployment → cache hit rate recovers → latency normalizes
```

**Conclusion:** Code bug (wrong cache key) is root cause

**Lesson:** Temporal ordering (cache misses BEFORE DB CPU) revealed reverse causation

---

## Key Takeaways

1. **Correlation ≠ causation** (but causation requires correlation)
2. **Temporal precedence is necessary but not sufficient** (cause must precede effect)
3. **Mechanism matters** (explain HOW A causes B)
4. **Always check for confounders** (hidden third variable)
5. **Causal graphs reveal intervention points** (fix root, not symptoms)
6. **Experiments prove causation** (controlled tests eliminate doubt)
7. **AI accelerates RCA** but humans validate causality

---

## Further Reading

- **Judea Pearl:** "Causality: Models, Reasoning, and Inference"
  Mathematical foundations of causal inference

- **Google SRE Book:** "Chapter 12: Effective Troubleshooting"
  Practical RCA techniques

- **Tyler Vigen:** "Spurious Correlations"
  Entertaining examples of correlation ≠ causation

---

**Module 1 Complete!** Next: Module Assessment
