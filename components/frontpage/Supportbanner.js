import { faHandshake } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "reactstrap/lib/Card";
import CardBody from "reactstrap/lib/CardBody";
import CardSubtitle from "reactstrap/lib/CardSubtitle";
import CardText from "reactstrap/lib/CardText";
// import FontAwesomeIcon
import { colors } from "../common/Constants";

const WhiteCardBody = (props) => (
  <CardBody
    style={{
      backgroundColor: "white",
      // fontWeight: "bold",
      color: colors.primaryAction,
      // height: 175,
    }}
    {...props}
  />
);

const CenteredSubTitle = ({ href, asHref, label, children }) => (
  <CardText style={{ textAlign: "left" }}>
    {/* <Link as={asHref} href={href}> */}
    <h2
      style={{
        fontSize: 16,
        color: "#888888",
        fontWeight: "normal",
        textAlign: "left",
        marginBottom: 0,
      }}
    >
      <FontAwesomeIcon icon={faHandshake}></FontAwesomeIcon> Dieses Projekt
      erfreut sich der freundlichen Unterstützung von
      <ul>
        <li>
          <a href="https://va-ra.com/" target="_blank">
            Rechtsanwalt Stade
          </a>
        </li>
        <li>
          <a href="https://korten-ag.de/" target="_blank">
            Anwalt Hamburg
          </a>
        </li>
      </ul>
    </h2>

    {/* </Link> */}
  </CardText>
);

const IMG_PLACEHOLDER =
  "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180";

const ShadowedCard = (props) => (
  <Card
    style={{
      marginRight: 0,
      marginBottom: 15,
      boxShadow: "0 1px 5px rgba(0, 0, 0, 0.15)",
    }}
    {...props}
  />
);
export default ({ imgsrc, label, href, asHref, alt }) => {
  return (
    <ShadowedCard>
      {/* <CardImg src={imgsrc || IMG_PLACEHOLDER} alt={alt} title={alt} /> */}
      <WhiteCardBody>
        <CenteredSubTitle></CenteredSubTitle>
      </WhiteCardBody>
    </ShadowedCard>
  );
};
