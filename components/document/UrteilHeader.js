import InfoBar from '../common/InfoBar'
import Link from 'next/link'
import Breadcrump from '../common/Breadcrumb'
import BreadcrumpItem from '../common/BreadcrumbItem'
//import { Timeline, TimelineEvent, TimelineBlip } from "react-event-timeline";

const UrteilBreadCrump = ({ gericht, aktenzeichen }) => (
  <Breadcrump small={true}>
    <BreadcrumpItem>
      <Link href="/">
        <a itemProp="url">
          <span itemProp="name">Startseite</span>
        </a>
      </Link>
    </BreadcrumpItem>
    <BreadcrumpItem>
      <Link as="/urteile" href={`/suche?d=r`}>
        <a itemProp="url">
          <span itemProp="name">Urteile</span>
        </a>
      </Link>
    </BreadcrumpItem>
    <BreadcrumpItem>
      <Link href={'/' + gericht.toLowerCase()}>
        <a itemProp="url">{gericht}</a>
      </Link>
    </BreadcrumpItem>
    <BreadcrumpItem>
      <a>{aktenzeichen}</a>
    </BreadcrumpItem>
  </Breadcrump>
)

const UrteilHeader = ({ doc }) => {
  const {
    rechtsprechungInfo: { aktenzeichen, gericht, gerichtsbezeichnung }
  } = doc

  return (
    <InfoBar>
      <UrteilBreadCrump gericht={gericht} aktenzeichen={aktenzeichen} />
    </InfoBar>
  )
};

export default UrteilHeader;
