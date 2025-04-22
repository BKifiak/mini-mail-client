import { Suspense, useState } from "react";
import EmailDetail from "./components/EmailDetail";
import EmailListContainer from "./components/EmailListContainer";
import SearchBar from "./components/SearchBar";
import ErrorBoundary from "./components/ErrorBoundary";
import { Email } from "./AppTypes";

function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const loadMore = () => setPageNumber((prev) => prev + 1);

  return (
    <div className="h-screen flex flex-col font-sans">
      <SearchBar
        query={query}
        setQuery={(val) => {
          setQuery(val);
          setPageNumber(1);
        }}
      />
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <div className="h-1/2 md:h-auto md:w-1/3 overflow-hidden border-b border-r border-slate-200">
          <ErrorBoundary
            fallback={
              <div className="p-4 text-red-500">
                Fehler beim Laden der E-Mails.
              </div>
            }
          >
            <Suspense
              fallback={
                <div className="p-4">E-Mails werden geladen, bitte warten…</div>
              }
            >
              <EmailListContainer
                query={query}
                pageNumber={pageNumber}
                onSelect={setSelectedEmail}
                loadMore={loadMore}
              />
            </Suspense>
          </ErrorBoundary>
        </div>

        <div className="flex-1 overflow-auto border-b border-slate-200">
          <EmailDetail email={selectedEmail} />
        </div>
      </div>
    </div>
  );
}

export default App;
