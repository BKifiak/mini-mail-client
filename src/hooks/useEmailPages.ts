import { fetchEmails } from "../api/fakeApi";
import { Email } from "../AppTypes";

// Simple cache
const cache = new Map<string, { read: () => Email[] | Promise<Email[]> }>();

export function useEmailPages(pageNumber: number, query: string) {
  const pages: Email[][] = [];
  let hasMore = true;

  for (let i = 1; i <= pageNumber; i++) {
    const key = `${query}-${i}`;
    let resource = cache.get(key);

    if (!resource) {
      resource = fetchEmails(i, query);
      cache.set(key, resource);
    }

    const emails = resource.read() as Email[]; // May throw for Suspense, it waits for resolution
    pages.push(emails);

    if (emails.length < 20) hasMore = false;
  }

  return { emails: pages.flat(), hasMore };
}
