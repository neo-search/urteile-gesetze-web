import css from "styled-jsx/css";
import Card from "reactstrap/lib/Card";
import CardImg from "reactstrap/lib/CardImg";
import CardBody from "reactstrap/lib/CardBody";
import CardSubtitle from "reactstrap/lib/CardSubtitle";
import Link from "next/link";

import { colors } from "../../common/Constants";

const IMG_PLACEHOLDER =
  "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180";

const styles = css`
  .card-outer {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .card-link {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .card-link :global(.card) {
    flex: 1;
    border: 1px solid #eef0f3;
    box-shadow: none;
    border-radius: 10px;
    overflow: hidden;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
    margin-bottom: 0;
  }

  .card-link:hover :global(.card) {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  .card-link :global(.card-img-top) {
    padding: 20px 24px 12px;
    object-fit: contain;
    height: 90px;
    background-color: #f8f9fc;
  }

  .card-link :global(.card-body) {
    padding: 12px 10px 14px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 56px;
  }

  .card-link :global(.card-subtitle) {
    text-align: center;
    font-size: 0.85rem;
    font-weight: 500;
    color: ${colors.primaryAction};
    margin: 0;
    line-height: 1.35;
  }
`;

export default ({ imgsrc, label, href, asHref, alt }) => {
  return (
    <div className="card-outer">
      <style jsx>{styles}</style>
      <Link as={asHref} href={href} className="card-link">
        <Card>
          <CardImg
            src={imgsrc || IMG_PLACEHOLDER}
            alt={alt}
            title={alt}
          />
          <CardBody>
            <CardSubtitle>{label}</CardSubtitle>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};
