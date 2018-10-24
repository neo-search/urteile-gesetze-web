import Treffer from "./treffer";
import Pagination from "./pagination";

const computeUrl = (query, selectedFilters) => {
  if (!query && !selectedFilters) return "/suche";
  if (!query && !selectedFilters.d && !selectedFilters.g && !selectedFilters.r)
    return "/suche";

  let result = "/suche?";
  if (query) result += "q=" + query + "&";
  if (selectedFilters.d) result += "d=" + selectedFilters.d + "&";
  if (selectedFilters.r) result += "r=" + selectedFilters.r + "&";
  if (selectedFilters.g) result += "g=" + selectedFilters.g + "&";
  return result.substring(0, result.length - 1); // chop off last Char (&)
};

const renderHighlightedDocs = highlightedDocs => {
  const { norms, rechtsprechungen, sections } = highlightedDocs;
  return (
    <>
      {norms.map(d => (
        <Treffer key={d.kanonischeUrl} doc={d}>
          {d.kanonischeUrl}
        </Treffer>
      ))}

      {rechtsprechungen.map(d => (
        <Treffer key={d.kanonischeUrl} doc={d}>
          {d.kanonischeUrl}
        </Treffer>
      ))}
      {sections.map(d => (
        <Treffer key={d.kanonischeUrl} doc={d}>
          {d.kanonischeUrl}
        </Treffer>
      ))}
    </>
  );
};

export default props => {
  const {
    docs,
    docCount,
    highlightedDocs,
    pageMetaInfo,
    searchRequest
  } = props;
  const { query, filter, page } = searchRequest;
  const url = computeUrl(query, filter);

  return (
    <div className="trefferliste">
      {renderHighlightedDocs(highlightedDocs)}
      {docs.map(d => (
        <Treffer key={d.kanonischeUrl} doc={d}>
          {d.kanonischeUrl}
        </Treffer>
      ))}
      <Pagination
        numberOfResults={docCount}
        baseUrl={url}
        actualPage={page}
        pageMetaInfo={pageMetaInfo}
        searchRequest={searchRequest}
      />
    </div>
  );
};
