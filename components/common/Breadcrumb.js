import Breadcrumb from "reactstrap/lib/Breadcrumb";

import css from "styled-jsx/css";

const smallStyle = { paddingTop: 4, fontSize: "0.8rem", paddingBottom: 6 };

const styles = css`
  ol {
    padding-top: 0;
    font-size: 0.8rem;
    background-color: inherit;
    padding-left: 0px;
    display: flex;
    list-style: none;
  }
`;

export default ({ style, children, markup, small }) => {
  const mergedStyle = { ...style, fontSize: small ? ".8rem" : "1rem" };
  if (markup)
    return (
      <ol
        itemscope=""
        itemType="https://schema.org/BreadcrumbList"
        style={mergedStyle}
      >
        <style jsx>{styles}</style>
        {children}
      </ol>
    );

  return (
    <ol style={mergedStyle}>
      <style jsx>{styles}</style>
      {children}
    </ol>
  );
};
