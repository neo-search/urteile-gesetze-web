import InfoBar from "../common/InfoBar";
import Link from "next/link";
import Breadcrump from "../common/Breadcrumb";
import BreadcrumpItem from "../common/BreadcrumbItem";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import SectionLink from "../links/SectionLink";
import Section from "./Section";

export default ({ doc }) => {
  const {
    sectionInfo: {
      titelNorm,
      kanonischeUrlNorm,
      ausfertigungDatumNorm,
      kanonischeUrlNext,
      kanonischeUrlPrevious,
      abkuerzungNorm,
      abkuerzung,
      abkuerzungNext,
      abkuerzungPrevious
    }
  } = doc;

  return (
    <InfoBar>
      <Breadcrump small={true}>
        <BreadcrumpItem>
          <Link href="/">
            <a itemProp="url">
              <span itemProp="name">Startseite</span>
            </a>
          </Link>
        </BreadcrumpItem>
        <BreadcrumpItem>
          <Link href="/gesetze">
            <a itemProp="url">
              <span itemProp="name">Gesetze</span>
            </a>
          </Link>
        </BreadcrumpItem>
        <BreadcrumpItem>
          <Link href={kanonischeUrlNorm}>
            <a itemProp="url">
              <span itemProp="name">{abkuerzungNorm}</span>
            </a>
          </Link>
        </BreadcrumpItem>
        <BreadcrumpItem>{abkuerzung}
          {/* <Link>
            <a>{abkuerzung}</a>
          </Link> */}
        </BreadcrumpItem>
      </Breadcrump>
      <Row>
      <Col md="9">{renderLinkPrevious(kanonischeUrlPrevious, abkuerzungPrevious)}</Col>

        <Col md="3">{renderLinkNext(kanonischeUrlNext, abkuerzungNext)}</Col>
      </Row>
    </InfoBar>
  );
};

const renderLinkNext = (kanonischeUrlNext, abkuerzungNext) => {
  if (kanonischeUrlNext && kanonischeUrlNext !== "") {
    return (
      <SectionLink url={kanonischeUrlNext}>
        <div className="treffer">
          <a href={kanonischeUrlNext}>{abkuerzungNext + " >"}</a>
        </div>
      </SectionLink>
    );
  }
};

const renderLinkPrevious = (kanonischeUrlPrevious, abkuerzungPrevious) => {
  if (kanonischeUrlPrevious && kanonischeUrlPrevious !== "") {
    return (
      <SectionLink url={kanonischeUrlPrevious}>
        <div className="treffer">
          <a href={kanonischeUrlPrevious}>{"< " + abkuerzungPrevious}</a>
        </div>
      </SectionLink>
    );
  }
};
