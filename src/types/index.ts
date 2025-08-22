// src/types/index.ts
export type Language = "ES" | "EN";

export interface Dictionary {
  ES: Record<string, string>;
  EN: Record<string, string>;
}
