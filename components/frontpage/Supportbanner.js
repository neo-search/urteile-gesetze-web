import { faHandshake } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default () => (
  <p style={{
    fontSize: "0.8rem",
    color: "#aaaaaa",
    margin: "20px 0 0 0",
    display: "flex",
    alignItems: "center",
    gap: 6,
  }}>
    <FontAwesomeIcon icon={faHandshake} style={{ flexShrink: 0 }} aria-hidden="true" />
    Unterstützt von{" "}
    <a
      href="https://va-ra.com/"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#aaaaaa", textDecoration: "underline" }}
    >
      Rechtsanwalt Stade
    </a>
  </p>
);
