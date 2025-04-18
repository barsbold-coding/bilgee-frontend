import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string | undefined): string {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });
}

export function formatDateRange(startDate: Date | string | undefined, endDate: Date | string | undefined): string {
  if (!startDate) return '';
  
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : 'Present';
  
  return `${start} - ${end}`;
}
