import Card from "reactstrap/lib/Card";
import CardImg from "reactstrap/lib/CardImg";
import CardBody from "reactstrap/lib/CardBody";
import CardSubtitle from "reactstrap/lib/CardSubtitle";

import { colors } from "../../common/Constants";
import Link from "next/link";

const WhiteCardBody = props => (
  <CardBody
    style={{
      backgroundColor: "white",
      // fontWeight: "bold",
      color: colors.primaryAction,
      height: 75
    }}
    {...props}
  />
);

const CenteredSubTitle = ({ href, asHref, label }) => (
  <CardSubtitle style={{ textAlign: "center" }}>
    <Link as={asHref} href={href}>
      <a>{label}</a>
    </Link>
  </CardSubtitle>
);

const IMG_PLACEHOLDER =
  "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180";

const ShadowedCard = props => (
  <Card
    style={{
      marginRight: 0,
      marginBottom: 15,
      boxShadow: "0 1px 5px rgba(0, 0, 0, 0.15)"
    }}
    {...props}
  />
);
export default ({ imgsrc, label, href, asHref, alt }) => {
  return (
    <ShadowedCard>
      <CardImg src={imgsrc || IMG_PLACEHOLDER} alt={alt} title={alt} />
      <WhiteCardBody>
        <CenteredSubTitle href={href} asHref={asHref} label={label} />
      </WhiteCardBody>
    </ShadowedCard>
  );
};
