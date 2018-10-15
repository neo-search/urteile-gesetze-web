import css from "styled-jsx/css";
import { colors } from "../../common/Constants";
import Link from "next/link";
import _without from "lodash/without";
import _isEmpty from "lodash/isEmpty";

const { primaryAction, primaryActionHover, foregroundColor } = colors;

const styles = css`
  div {
    padding-top: 9px;
    padding-bottom: 3px;
    padding-left: 12px;
    margin-left: -12px;
    padding-right: 12px;
    width: 215px;
  }

  div:hover {
    background-color: ${colors.hoverBackgroundColor};
  }

  div:hover > a {
    color: ${primaryAction};
  }

  div > a {
    color: ${foregroundColor};
  }

  input[type="checkbox"] {
    margin-right: 9px;
    height: 1rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-color: #effbef;
    margin-bottom: -2px;
    border-radius: 2px;
    display: inline-block;
    position: relative;
    width: 18px;
    height: 18px;
    border: 1px solid #ccc;
  }

  input[type="checkbox"]:active,
  input[type="checkbox"]:checked:active {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
      inset 0px 1px 3px rgba(0, 0, 0, 0.1);
  }

  input[type="checkbox"]:checked {
    background-color: #e9ecee;
    border: 1px solid ${primaryAction};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
      inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05),
      inset 15px 10px -12px rgba(255, 255, 255, 0.1);
    color: #99a1a7;
    background-color: white;
    background-color: ${primaryAction};
    color: white;
  }

  input[type="checkbox"]:checked:after {
    content: "✓";
    position: absolute;
    top: -4px;
    left: 2px;
    color: ${primaryAction};
    // color: #4294cd;
    color: white;
  }
  div.checked,
  div.checked > a {
    color: ${primaryAction};
  }
  span.lighter {
    color: #999;
    font-weight: normal;
  }
`;

const without = (arrayOrString, obj) => {
  const result = _without(arrayOrString, obj);
  // return result == [] ? undefined : result;
  return result;
};

const linksparam = (urlparams, facetteId, id) => {
  const linkparam = { ...urlparams };

  if (!linkparam[facetteId]) {
    linkparam[facetteId] = [id];
    return linkparam;
  }

  if (typeof linkparam[facetteId] == "string" && linkparam[facetteId] == id) {
    linkparam[facetteId] = without(linkparam[facetteId], id);
    return linkparam;
  }

  if (typeof linkparam[facetteId] == "string" && linkparam[facetteId] != id) {
    linkparam[facetteId] = [linkparam[facetteId], id];
    return linkparam;
  }

  if (!linkparam[facetteId].includes(id)) {
    linkparam[facetteId] = [...linkparam[facetteId], id];
    return linkparam;
  }

  linkparam[facetteId] = without(linkparam[facetteId], id);
  return linkparam;
};

const cleanedLinkparam = (urlparams, facetteId, id) => {
  const params = linksparam(urlparams, facetteId, id);

  for (let [key, value] of Object.entries(params)) {
    if (!value || value === "" || _isEmpty(value)) delete params[key];
  }
  return params;
};

const isChecked = (urlparams, facetteId, id) => {
  if (!urlparams[facetteId]) return false;

  if (typeof urlparams[facetteId] == "string" && urlparams[facetteId] !== id)
    return false;

  if (
    typeof urlparams[facetteId] !== "string" &&
    !urlparams[facetteId].includes(id)
  )
    return false;

  return true;
};

const objectEntryPolyfill = () => {
  if (!Object.entries)
    Object.entries = function(obj) {
      var ownProps = Object.keys(obj),
        i = ownProps.length,
        resArray = new Array(i); // preallocate the Array
      while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

      return resArray;
    };
};

export default ({ facetteId, name, id, hits, urlparams }) => {
  objectEntryPolyfill();

  const params = cleanedLinkparam(urlparams, facetteId, id);
  const checked = isChecked(urlparams, facetteId, id);

  return (
    <Link href={{ pathname: "/suche", query: params }}>
      <div>
        <input
          type="checkbox"
          id={`check-${facetteId}-${id}`}
          checked={checked}
        />
        <label htmlFor={`check-${facetteId}-${id}`}>
          {name + " "}
          <span className="lighter">({hits.toLocaleString("DE")})</span>
        </label>
        <style jsx>{styles}</style>
      </div>
    </Link>
  );
};
