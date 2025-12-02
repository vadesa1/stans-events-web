import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency value
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

/**
 * Format date to readable string
 * Handles both simple date strings and Ticketmaster nested date structures
 */
export function formatDate(date: string | Date | any): string {
  try {
    // Handle null/undefined
    if (!date) return "Date TBD";

    // Handle Ticketmaster nested structure
    if (typeof date === 'object' && date.start) {
      const dateStr = date.start.dateTime || date.start.localDate;
      if (!dateStr) return "Date TBD";
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(dateStr));
    }

    // Handle standard date string or Date object
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return "Date TBD";
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(parsedDate);
  } catch (error) {
    console.error("Error formatting date:", error, date);
    return "Date TBD";
  }
}

/**
 * Format date and time
 * Handles both simple date strings and Ticketmaster nested date structures
 */
export function formatDateTime(date: string | Date | any): string {
  try {
    // Handle null/undefined
    if (!date) return "Date & Time TBD";

    // Handle Ticketmaster nested structure
    if (typeof date === 'object' && date.start) {
      const dateStr = date.start.dateTime || date.start.localDate;
      if (!dateStr) return "Date & Time TBD";
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date(dateStr));
    }

    // Handle standard date string or Date object
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return "Date & Time TBD";
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(parsedDate);
  } catch (error) {
    console.error("Error formatting date time:", error, date);
    return "Date & Time TBD";
  }
}

/**
 * Calculate savings percentage
 */
export function calculateSavings(originalPrice: number, discountedPrice: number): number {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
}
