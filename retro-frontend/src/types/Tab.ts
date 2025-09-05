import type React from "react";

export type Tab = {
  id: number;
  title: string;
  icon: string;
  minimized: boolean;
  maximize: boolean;
  zIndex: number;
  children: React.ReactNode;
  programType: "recycle" | "my computer";
  prompt: boolean;
  x: number;
  y: number;
  targetX?: number;
  targetY?: number;
  measurements?: { x: number; y: number; width: number; height: number };
};
