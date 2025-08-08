import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hasHtmlContent(content: string): boolean {
  const htmlRegex = /<\/?[a-z][\s\S]*>/i;
  return htmlRegex.test(content);
}

export function createNewId(): string {
  const now = Date.now().toString();
  const tail =
    Math.floor(10 + Math.random() * 90)
      .toString()
      .padStart(2, '0') + Math.floor(100 + Math.random() * 900).toString();
  const rawId = now + tail;
  const id15 = rawId.slice(0, 15);
  const formattedId = `${id15.slice(0, 3)}-${id15.slice(3, 6)}-${id15.slice(
    6,
    9
  )}-${id15.slice(9, 12)}-${id15.slice(12, 15)}`;
  return formattedId;
}

export function verifyId(id: string): boolean {
  const regex = /^\d{3}-\d{3}-\d{3}-\d{3}-\d{3}$/;
  return regex.test(id);
}
