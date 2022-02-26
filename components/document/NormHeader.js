import Link from "next/link";
import Breadcrump from "../common/Breadcrumb";
import BreadcrumpItem from "../common/BreadcrumbItem";
import InfoBar from "../common/InfoBar";

export default ({ doc }) => {
  const { titel, abkuerzung, kurzueberschrift, kanonischeUrl } = doc;

  return (
    <InfoBar>
      <Breadcrump small={true}>
        <BreadcrumpItem>
          <Link href="/">
            <a>Home</a>
          </Link>
        </BreadcrumpItem>
        <BreadcrumpItem>
          <Link href="/gesetze">
            <a>Gesetze</a>
          </Link>
        </BreadcrumpItem>
        <BreadcrumpItem>
          <Link href={kanonischeUrl}>
            <a>{abkuerzung}</a>
          </Link>
        </BreadcrumpItem>
      </Breadcrump>
    </InfoBar>
  );
};
