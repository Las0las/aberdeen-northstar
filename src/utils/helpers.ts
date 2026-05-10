// Utility functions

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Class name utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date formatting
export function formatDate(date: string | Date | null): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(date: string | Date | null): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function formatRelativeTime(date: string | Date | null): string {
  if (!date) return '';
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(date);
}

// Currency formatting
export function formatCurrency(amount: number | null, currency = 'USD'): string {
  if (amount === null) return '';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

// Number formatting
export function formatNumber(num: number | null): string {
  if (num === null) return '';
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatCompactNumber(num: number | null): string {
  if (num === null) return '';
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(num);
}

// String utilities
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ID generation
export function generateId(): string {
  return crypto.randomUUID();
}

// Pagination helpers
export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export function calculatePagination(
  total: number,
  page: number,
  pageSize: number
): { from: number; to: number; totalPages: number } {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const totalPages = Math.ceil(total / pageSize);
  return { from, to, totalPages };
}

// Debounce
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// Status color mapping
// Maps a status string to a semantic token-based class pair.
// Tokens (success/warning/info/destructive/neutral) carry light + dark mode variants.
export function getStatusColor(status: string): string {
  const SUCCESS = 'bg-success text-success-foreground';
  const WARNING = 'bg-warning text-warning-foreground';
  const INFO = 'bg-info text-info-foreground';
  const DANGER = 'bg-destructive/15 text-destructive';
  const NEUTRAL = 'bg-neutral text-neutral-foreground';

  const colors: Record<string, string> = {
    active: SUCCESS,
    inactive: NEUTRAL,
    pending: WARNING,
    approved: SUCCESS,
    rejected: DANGER,
    completed: INFO,
    cancelled: NEUTRAL,
    draft: NEUTRAL,
    open: INFO,
    closed: NEUTRAL,
    hired: SUCCESS,
    interview: INFO,
    offer: INFO,
    new: INFO,
    in_progress: WARNING,
    scheduled: INFO,
  };
  return colors[status.toLowerCase()] || NEUTRAL;
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone formatting
export function formatPhone(phone: string | null): string {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
}

// Array utilities
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    (result[groupKey] = result[groupKey] || []).push(item);
    return result;
  }, {} as Record<string, T[]>);
}

export function sortBy<T>(array: T[], key: keyof T, ascending = true): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    if (aVal < bVal) return ascending ? -1 : 1;
    if (aVal > bVal) return ascending ? 1 : -1;
    return 0;
  });
}

export function uniqueBy<T>(array: T[], key: keyof T): T[] {
  const seen = new Set();
  return array.filter((item) => {
    const val = item[key];
    if (seen.has(val)) return false;
    seen.add(val);
    return true;
  });
}
