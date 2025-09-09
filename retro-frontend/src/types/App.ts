import type React from "react";

export type App = {
  id: number;
  title: string;
  icon: string;
  minimized: boolean;
  maximize: boolean;
  zIndex: number;
  showHeader: boolean;
  children: React.ReactNode | string;
  programType: "recycle" | "my computer" | "winamp";
  prompt: boolean;
  x: number;
  y: number;
  targetX?: number;
  targetY?: number;
  measurements?: { x: number; y: number; width: number; height: number };
};
