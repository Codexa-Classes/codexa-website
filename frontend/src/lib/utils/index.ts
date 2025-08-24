import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format date to consistent "01 Aug 2025" format
 * @param date - Date object, string, or Date string
 * @returns Formatted date string
 */
export function formatDate(date: Date | string | undefined): string {
  if (!date) return 'Not specified'
  return dayjs(date).format("DD MMM YYYY")
}

/**
 * Format date to relative time (e.g., "2 days ago")
 * @param date - Date object, string, or Date string
 * @returns Relative time string
 */
export function formatRelativeTime(date: Date | string | undefined): string {
  if (!date) return 'Not specified'
  return dayjs(date).fromNow()
}

// Export sitemap utilities
export * from './sitemap';
export * from './robots';