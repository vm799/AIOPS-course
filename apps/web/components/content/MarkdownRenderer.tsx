"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Headings
          h1: ({ ...props }) => (
            <h1 className="text-4xl font-bold text-text-primary mb-6 mt-8" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="text-3xl font-bold text-text-primary mb-4 mt-8 border-b border-accent-neon-cyan/20 pb-2" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="text-2xl font-semibold text-text-primary mb-3 mt-6" {...props} />
          ),
          h4: ({ ...props }) => (
            <h4 className="text-xl font-semibold text-accent-neon-cyan mb-2 mt-4" {...props} />
          ),

          // Paragraphs and text
          p: ({ ...props }) => (
            <p className="text-text-primary leading-relaxed mb-4" {...props} />
          ),
          strong: ({ ...props }) => (
            <strong className="font-bold text-accent-neon-cyan" {...props} />
          ),
          em: ({ ...props }) => (
            <em className="italic text-accent-neon-green" {...props} />
          ),

          // Lists
          ul: ({ ...props }) => (
            <ul className="list-disc list-inside space-y-2 mb-4 text-text-primary" {...props} />
          ),
          ol: ({ ...props }) => (
            <ol className="list-decimal list-inside space-y-2 mb-4 text-text-primary" {...props} />
          ),
          li: ({ ...props }) => (
            <li className="ml-4" {...props} />
          ),

          // Links
          a: ({ ...props }) => (
            <a
              className="text-accent-neon-cyan hover:text-accent-neon-green transition-colors underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),

          // Code blocks
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : 'text';

            return !inline ? (
              <div className="my-4 rounded-lg overflow-hidden border border-accent-neon-cyan/20">
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={language}
                  PreTag="div"
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    background: '#0B0F14',
                    fontSize: '0.875rem',
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code
                className="px-2 py-1 rounded bg-background-elevated text-accent-neon-green font-mono text-sm border border-accent-neon-cyan/20"
                {...props}
              >
                {children}
              </code>
            );
          },

          // Blockquotes
          blockquote: ({ ...props }) => (
            <blockquote
              className="border-l-4 border-accent-neon-cyan pl-4 py-2 my-4 bg-background-elevated rounded-r italic text-text-muted"
              {...props}
            />
          ),

          // Tables
          table: ({ ...props }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full border border-accent-neon-cyan/20 rounded-lg" {...props} />
            </div>
          ),
          thead: ({ ...props }) => (
            <thead className="bg-background-elevated" {...props} />
          ),
          tbody: ({ ...props }) => (
            <tbody {...props} />
          ),
          tr: ({ ...props }) => (
            <tr className="border-b border-accent-neon-cyan/10 hover:bg-background-elevated/50 transition-colors" {...props} />
          ),
          th: ({ ...props }) => (
            <th className="px-4 py-3 text-left text-accent-neon-cyan font-semibold" {...props} />
          ),
          td: ({ ...props }) => (
            <td className="px-4 py-3 text-text-primary" {...props} />
          ),

          // Horizontal rule
          hr: ({ ...props }) => (
            <hr className="my-8 border-t border-accent-neon-cyan/20" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
