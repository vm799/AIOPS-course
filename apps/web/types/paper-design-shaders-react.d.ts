/**
 * Type definitions for @paper-design/shaders-react
 * This library provides WebGL shader components for React
 */

declare module '@paper-design/shaders-react' {
  import { CSSProperties } from 'react';

  export interface LiquidMetalProps {
    style?: CSSProperties;
    [key: string]: any;
  }

  export const LiquidMetal: React.FC<LiquidMetalProps>;

  export const liquidMetalPresets: Array<Record<string, any>>;
}
