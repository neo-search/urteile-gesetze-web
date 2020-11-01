import RechtsprechungLink from './../../common/RechtsprechungLink'
import css from 'styled-jsx/css'
import Breadcrumb from './TrefferBreadcrumb'
import BreadcrumbItem from './TrefferBreadcrumbItem'
import { colors } from '../../common/Constants'

const styles = css`
  div.treffer {
    padding-bottom: 6px;
  }

  div.treffer:hover {
    background-color: ${colors.hoverBackgroundColor};
    cursor: pointer;
  }

  div.treffer-outer {
    // padding-bottom: 16px;
  }
`
export default ({ doc }) => {
  const kurzbeschreibung = doc.kurzBeschreibung ? doc.kurzBeschreibung : ''

  return (
    <div
      className="treffer-outer"
      style={{ borderBottom: '1px solid #eaeaea', marginBottom: 25 }}
    >
      <style jsx>{styles}</style>
      <div className="treffer">
        <div style={{ paddingBottom: 4 }}>
          <div
            style={{ fontWeight: 'bold', color: '#999999', fontSize: '0.8rem' }}
          >
            {doc.date}
          </div>
          <RechtsprechungLink url={doc.kanonischeUrl}>
            <a href={`${doc.kanonischeUrl}`} style={{ fontWeight: 600 }}>
              {doc.gericht + ' ' + doc.spruchkoerper}
              <span style={{ fontWeight: 400, color: colors.primaryAction }}>
                {doc.titel ? ', ' + doc.titel : ''}
              </span>
            </a>
          </RechtsprechungLink>
        </div>
        <RechtsprechungLink url={doc.kanonischeUrl}>
          <div>
            <span
              dangerouslySetInnerHTML={{
                __html: kurzbeschreibung
              }}
            />
            <br />
          </div>
        </RechtsprechungLink>
      </div>
      <Breadcrumb>
        <BreadcrumbItem>Urteile</BreadcrumbItem>
        <BreadcrumbItem>{doc.gerichtsbezeichnung}</BreadcrumbItem>
        <BreadcrumbItem>
          <b>{doc.abkuerzung}</b>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  )
}
