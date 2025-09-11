import type React from "react";

export type App = {
  id: number;
  title: string;
  icon: string;
  resizable?: boolean;
  minimized: boolean;
  maximize: boolean;
  zIndex: number;
  showHeader: boolean;
  noFooterWindow?: boolean;
  children: React.ReactNode | string;
  programType: "recycle" | "my computer" | "winamp" | "error";
  prompt: boolean;
  x: number;
  y: number;
  targetX?: number;
  targetY?: number;
  measurements?: { x: number; y: number; width: number; height: number };
};
