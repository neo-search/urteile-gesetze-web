import { colors } from "../../common/Constants";
import Pagination from "reactstrap/lib/Pagination";
import PaginationItem from "reactstrap/lib/PaginationItem";

import Link from "next/link";

import css from "styled-jsx/css";
const styles = css`
  a {
    position: relative;
    display: block;
    padding: 0.65rem 0.9rem;
    margin-left: 10px;
    line-height: 1.25;
    color: ${colors.primaryAction};
    background-color: #fff;
    border: 1px solid #dee2e6;
  }
  a:hover {
    background-color: ${colors.hoverBackgroundColor};
  }
`;

const CenteredPagination = props => (
  <div style={{ textAlign: "center" }}>
    <Pagination
      {...props}
      style={{
        paddingBottom: 40,
        paddingTop: 10,
        marginLeft: "auto",
        marginRight: "auto",
        display: "inline-block"
      }}
    />
  </div>
);

const PageLink = ({
  href,
  children,
  active,
  pageMetaInfo,
  pageIndex,
  searchRequest
}) => {
  // as={props.url}
  // href={`/rechtsprechung?kanonischeUrl=${props.url}`}
  const { canonical, pageName, landingpage,suche } = pageMetaInfo;
  // const as = canonical
  //   ? canonical + (canonical.indexOf("?") !== -1 ? "&" : "?") + "p=" + pageIndex
  //   : href;
  const as = canonical
    ? pageIndex == 0
      ? canonical
      : `${canonical}?p=${pageIndex}`
    : href;
  href = canonical
    ? pageName +
      "?" +
      (landingpage ? "landingpage=" + landingpage + "&" : "") +
      "p=" +
      pageIndex +"&q=" +suche
    : href;
  searchRequest = { ...searchRequest, p: pageIndex };

  return (
    <Link
      href={href}
      as={as}
      pageMetaInfo={pageMetaInfo}
      searchRequest={searchRequest}
    >
      {/* <div> */}
      <a style={{ color: active ? "red" : colors.primaryAction }}>
        <style jsx>{styles}</style>
        {children}
      </a>
      {/* </div> */}
    </Link>
  );
};

const PageItem = props => (
  <PaginationItem
    {...props}
    style={{ marginLeft: 0, display: "inline-block" }}
  />
);

const pagingParam = (page, urlparams) => {
  return { ...urlparams, q: page };
};

export default ({
  numberOfResults,
  actualPage = 0,
  baseUrl,
  pageSize = 20,
  pageMetaInfo,
  searchRequest
}) => {
  const pageIndex = Number(actualPage);
  const numberOfPages = numberOfResults / pageSize + 1;
  const result = [];
  const minValue = pageIndex - 3 < 0 ? 0 : pageIndex - 3;

  let maxValue = pageIndex + 6 - (pageIndex - minValue);
  maxValue = maxValue < numberOfPages ? maxValue : numberOfPages;

  for (let i = minValue; i < maxValue - 1; i++) result.push(i);

  const { title, description, canonical } = pageMetaInfo;

  return (
    <CenteredPagination>
      {pageIndex > 0 ? (
        <PageItem>
          <PageLink
            href={`${baseUrl}${
              baseUrl.indexOf("?") !== -1 ? "&" : "?"
            }p=${pageIndex - 1}`}
            pageMetaInfo={pageMetaInfo}
            pageIndex={pageIndex - 1}
            searchRequest={searchRequest}
          >
            Zurück
          </PageLink>
        </PageItem>
      ) : (
        <></>
      )}
      {result.map(i => (
        <PageItem key={i}>
          <PageLink
            href={`${baseUrl}${baseUrl.indexOf("?") !== -1 ? "&" : "?"}p=${i}`}
            active={pageIndex === i}
            pageMetaInfo={pageMetaInfo}
            pageIndex={i}
            searchRequest={searchRequest}
          >
            {i + 1}
          </PageLink>
        </PageItem>
      ))}
      {numberOfPages - 1 > pageIndex + 1 ? (
        <PageItem>
          <PageLink
            href={`${baseUrl}${
              baseUrl.indexOf("?") !== -1 ? "&" : "?"
            }p=${pageIndex + 1}`}
            pageMetaInfo={pageMetaInfo}
            pageIndex={pageIndex + 1}
            searchRequest={searchRequest}
          >
            Weiter
          </PageLink>
        </PageItem>
      ) : (
        <></>
      )}
    </CenteredPagination>
  );
};
