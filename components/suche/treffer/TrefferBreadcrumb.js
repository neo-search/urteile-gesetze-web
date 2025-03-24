// import css from "styled-jsx/css";

// const styles = css`
//   ol {
//     padding-top: 0;
//     font-size: 0.8rem;
//     background-color: inherit;
//     padding-left: 0px;
//     display: flex;
//     list-style: none;
//   }
// `;

export default props => {
  return (
    <ol style={props.style}>
      {/* <style jsx>{styles}</style> */}
      {props.children}
    </ol>
  );
};
