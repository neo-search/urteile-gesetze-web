import SectionNorm from "./SectionNorm";
// import css from "styled-jsx/css";
import SectionNormWithContent from "./SectionNormWithContent";

// const styles = css`
//   div :global(div) {
//   }
// `;

export default ({ sections }) => {
  return <div>
      {/* <style jsx>{styles}</style> */}
      {/* <hr /> */}
      {sections.map(d => {
        if (d.smallNorm && d.smallNorm === true) {
          return (<SectionNormWithContent key={d.kanonischeUrl} doc={d} />);
        } else {
          return (<SectionNorm key={d.kanonischeUrl} doc={d} gliederung={d.gliederung}>
            {d.kanonischeUrl}
          </SectionNorm>);
        }
      })}
    </div>;
};
