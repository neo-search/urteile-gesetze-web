import Card from "reactstrap/lib/Card";
import CardImg from "reactstrap/lib/CardImg";
import CardBody from "reactstrap/lib/CardBody";
import CardSubtitle from "reactstrap/lib/CardSubtitle";
import Link from "next/link";

import { colors } from "../../common/Constants";

const IMG_PLACEHOLDER =
  "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180";

export default ({ imgsrc, label, href, asHref, alt }) => {
  return (
    <Link
      as={asHref}
      href={href}
      style={{ textDecoration: "none", display: "block" }}
    >
      <Card
        style={{
          marginRight: 0,
          marginBottom: 15,
          boxShadow: "0 1px 5px rgba(0, 0, 0, 0.15)",
        }}
      >
        <CardImg src={imgsrc || IMG_PLACEHOLDER} alt={alt} title={alt} />
        <CardBody
          style={{
            backgroundColor: "white",
            color: colors.primaryAction,
            height: 75,
          }}
        >
          <CardSubtitle style={{ textAlign: "center" }}>{label}</CardSubtitle>
        </CardBody>
      </Card>
    </Link>
  );
};
