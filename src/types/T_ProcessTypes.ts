export const M_AdjustmentType = {
  Brightness: "brightness",
  Contrast: "contrast",
  Saturation: "saturation",
  Shadows: "shadows",
  Temperature: "temperature",
  Tint: "tint",
  Vibrance: "vibrance",
  Highlights: "highlights",
} as const;

export type AdjustmentType =
  (typeof M_AdjustmentType)[keyof typeof M_AdjustmentType];
