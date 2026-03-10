import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const FOCUS_TIME_KEY = "mind-ease:focus-seconds";

export const FOCUS_DATE_KEY = "mind-ease:focus-date";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTodayDateString() {
  return new Date().toISOString().slice(0, 10);
}
