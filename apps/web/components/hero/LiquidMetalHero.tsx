"use client";

import { LiquidMetal, liquidMetalPresets } from '@paper-design/shaders-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface LiquidMetalHeroProps {
  badge?: string;
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  secondaryCtaLabel?: string;
  onPrimaryCtaClick: () => void;
  onSecondaryCtaClick?: () => void;
  metrics?: Array<{
    value: string;
    label: string;
  }>;
}

export default function LiquidMetalHero({
  badge,
  title,
  subtitle,
  primaryCtaLabel,
  secondaryCtaLabel,
  onPrimaryCtaClick,
  onSecondaryCtaClick,
  metrics = [],
}: LiquidMetalHeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0F14]">
      {/* Neon Green Wave Animation */}
      <LiquidMetal
        {...liquidMetalPresets[2]}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          opacity: 0.6
        }}
      />

      {/* Gradient Overlay for Neon Effect */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.15) 0%, transparent 70%)',
        }}
      />

      <div className="container relative z-10 mx-auto px-6 lg:px-8 max-w-7xl">
        <motion.div
          className="text-center space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {badge && (
            <motion.div
              className="flex justify-center"
              variants={itemVariants}
            >
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 text-cyan-400 border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm px-4 py-2 text-sm font-medium"
              >
                ✨ {badge}
              </Badge>
            </motion.div>
          )}

          <motion.div
            className="space-y-6"
            variants={itemVariants}
          >
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight"
              variants={itemVariants}
              style={{
                background: 'linear-gradient(to bottom, #E5E7EB 0%, #22D3EE 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {title}
            </motion.h1>

            <motion.p
              className="max-w-3xl mx-auto text-xl sm:text-2xl text-gray-400 leading-relaxed"
              variants={itemVariants}
            >
              {subtitle}
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={buttonVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onPrimaryCtaClick}
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-white hover:from-cyan-600 hover:to-emerald-600 transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:shadow-[0_0_40px_rgba(34,211,238,0.7)] text-lg px-8 py-6 font-semibold border-0"
              >
                {primaryCtaLabel} →
              </Button>
            </motion.div>

            {secondaryCtaLabel && onSecondaryCtaClick && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={onSecondaryCtaClick}
                  variant="outline"
                  size="lg"
                  className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm text-lg px-8 py-6 font-semibold"
                >
                  {secondaryCtaLabel}
                </Button>
              </motion.div>
            )}
          </motion.div>

          {metrics.length > 0 && (
            <motion.div
              className="pt-12"
              variants={itemVariants}
            >
              <Card className="bg-gradient-to-br from-cyan-950/30 to-emerald-950/30 border border-cyan-500/20 backdrop-blur-md shadow-[0_0_50px_rgba(34,211,238,0.2)]">
                <div className="p-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {metrics.map((metric, index) => (
                      <motion.div
                        key={index}
                        className="flex flex-col items-center justify-center text-center space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.8 + (index * 0.1)
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div
                          className="text-4xl md:text-5xl font-bold"
                          style={{
                            background: 'linear-gradient(135deg, #22D3EE 0%, #10B981 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}
                        >
                          {metric.value}
                        </div>
                        <p className="text-sm text-gray-400 font-medium">
                          {metric.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
