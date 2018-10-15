import SectionsNorm from "./SectionsNorm";

export default ({ doc, zitierendeUrteile }) => {
  const {
    titel,
    abkuerzung,
    kurzueberschrift,
    kanonischeUrl,
    datum,
    stand,
    sections
  } = doc;

  return (
    <div>
      <h1
        style={{ fontSize: "1.3rem", paddingBottom: 40, textAlign: "center" }}
      >
        <span style={{ fontWeight: "bold" }}>
          {(kurzueberschrift ? kurzueberschrift : "") + " (" + abkuerzung + ")"}
        </span>
        <br />
        <span style={{ fontWeight: "normal" }}>{titel}</span>
      </h1>
      <p
        style={{
          fontSize: "0.9rem",
          fontWeight: 300,
          textAlign: "center",
          paddingBottom: 0,
          paddingTop: 0
        }}
      >
      <hr />
        {"Ausfertigungsdatum: " + datum}
      </p>
      <p
        style={{
          fontSize: "0.9rem",
          fontWeight: 300,
          textAlign: "center",
          paddingBottom: 0,
          paddingTop: 0
        }}
      >
        {stand ? `Stand: ` + stand : ""}
      </p>
      {/* <article dangerouslySetInnerHTML={{ __html: doc.sectionInfo.content }} /> */}
      <SectionsNorm sections={sections} />
      {renderZitierendeUrteile(abkuerzung, zitierendeUrteile)}
    </div>
  );
};

const renderZitierendeUrteile = (abkuerzung, docs) => {
  if (docs && docs.length > 0)
    return (
      <div style={{ paddingTop: "3.5rem" }}>
        <h4 style={{ paddingBottom: "1rem" }}>
          Zitierende Urteile zu {abkuerzungSection}
        </h4>
        {docs.map(f => (
          <KurzformTrefferRechtsprechung doc={f} />
        ))}
      </div>
    );
};
