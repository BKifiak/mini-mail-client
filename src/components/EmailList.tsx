import { useRef, useEffect } from "react";
import { Email } from "../AppTypes";
import EmailListItem from "./EmailListItem";

type EmailListProps = {
  emails: Email[];
  onSelect: (email: Email) => void;
  hasMore: boolean;
  loadMore: () => void;
};

export default function EmailList({
  emails,
  onSelect,
  hasMore,
  loadMore,
}: EmailListProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [emails, hasMore]);

  return (
    <div className="overflow-y-auto h-full">
      {emails.length ? (
        emails.map((email) => (
          <EmailListItem key={email.id} email={email} onSelect={onSelect} />
        ))
      ) : (
        <h4 className="text-center text-3xl p-4 py-8 text-gray-500">
          Keine Daten
        </h4>
      )}
      {hasMore && (
        <div ref={sentinelRef} className="p-4 text-center text-gray-500">
          Mehr laden...
        </div>
      )}
    </div>
  );
}
