import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function subscribe(eventName: string, listener: any) {
  document.addEventListener(eventName, listener);
}

function unsubscribe(eventName: string, listener: any) {
  document.removeEventListener(eventName, listener);
}

function publish(eventName: string, data?: any) {
  const event = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(event);
}

export { publish, subscribe, unsubscribe };
