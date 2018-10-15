import FacetteValue from "./FacetteValue";
import css from "styled-jsx/css";

const styles = css`
  div.facette-title {
    color: #909c9a;
    font-size: 0.8rem;
  }
`;
export default ({ name, id, values, urlparams }) => {
  return (
    <div>
      <div className="facette-title">{name}</div>
      {values.map(({ valueName, valueId, checked, hits }) => (
        <FacetteValue
          facetteId={id}
          name={valueName}
          id={valueId}
          key={`${id}#${valueId}`}
          checked={checked}
          hits={hits}
          urlparams={urlparams}
        />
      ))}
      <style jsx>{styles}</style>
    </div>
  );
};
