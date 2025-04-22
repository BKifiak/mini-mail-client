import { Email } from "../AppTypes";
import rawUsers from "../data/emails.json";

const LIMIT_PER_PAGE = 20;
const TIMEOUT = 500;
const STATUS_MAP = {
  ERROR: "error",
  PENDING: "pending",
  SUCCESS: "success",
};

// Fetch function — from imported JSON to simulate calling a REST API
// Use axios in order to call REST API
export function fetchEmails(
  pageNumber: number,
  query: string,
): { read: () => Email[] | Promise<Email[]> } {
  const skip = (pageNumber - 1) * LIMIT_PER_PAGE;

  // Simulate async operation
  const promise = new Promise<Email[]>((resolve) => {
    // Filter emails based on query (search by sender or subject)
    const filteredUsers = rawUsers.filter(({ sender, subject }: any) => {
      const q = query.toLowerCase();

      // Check if the query matches either sender or subject (case-insensitive)
      return (
        sender.toLowerCase().includes(q) || subject.toLowerCase().includes(q)
      );
    });

    // Paginate the filtered users
    const pagedUsers = filteredUsers.slice(skip, skip + LIMIT_PER_PAGE);

    setTimeout(() => resolve(pagedUsers), TIMEOUT); // Optional: simulate network delay
  });

  // Wrap the promise for Suspense compatibility
  let status = STATUS_MAP.PENDING;
  let result: Email[] | null = null;
  let error: any = null;

  const suspender = promise.then(
    (res) => {
      status = STATUS_MAP.SUCCESS;
      result = res;
    },
    (e) => {
      status = STATUS_MAP.ERROR;
      error = e;
    },
  );

  return {
    read() {
      if (status === STATUS_MAP.PENDING) {
        throw suspender; // This will throw the promise for Suspense to handle
      } else if (status === STATUS_MAP.ERROR) {
        throw error; // This will throw the error if the promise failed
      } else if (status === STATUS_MAP.SUCCESS) {
        return result; // This will return the result once resolved
      }
    },
  };
}
