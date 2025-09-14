export type DesktopApp = {
  id: number;
  title: string;
  icon: string;
  isGame?: boolean;
  x: number;
  y: number;
  targetX?: number;
  targetY?: number;
  show?: boolean;
};
