import InfoBar from "../common/InfoBar";
import Link from "next/link";
import Breadcrump from "../common/Breadcrumb";
import BreadcrumpItem from "../common/BreadcrumbItem";

export default ({ doc }) => {
  const { titel, abkuerzung, kurzueberschrift, kanonischeUrl } = doc;

  return (
    <InfoBar>
      <Breadcrump small={true}>
        <BreadcrumpItem>
          <Link legacyBehavior href="/">
            <a>Home</a>
          </Link>
        </BreadcrumpItem>
        <BreadcrumpItem>
          <Link legacyBehavior href="/gesetze">
            <a>Gesetze</a>
          </Link>
        </BreadcrumpItem>
        <BreadcrumpItem>
          <Link legacyBehavior href={kanonischeUrl}>
            <a>{abkuerzung}</a>
          </Link>
        </BreadcrumpItem>
      </Breadcrump>
    </InfoBar>
  );
};
