import { Email } from "../AppTypes";
import { useEmailPages } from "../hooks/useEmailPages";
import EmailList from "./EmailList";

type EmailListContainerProps = {
  query: string;
  pageNumber: number;
  onSelect: (email: Email) => void;
  loadMore: () => void;
};
export default function EmailListContainer({
  query,
  pageNumber,
  onSelect,
  loadMore,
}: EmailListContainerProps) {
  const { emails, hasMore } = useEmailPages(pageNumber, query);

  return (
    <EmailList
      emails={emails}
      onSelect={onSelect}
      hasMore={hasMore}
      loadMore={loadMore}
    />
  );
}
