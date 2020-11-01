import SectionLink from './../../common/SectionLink'
import css from 'styled-jsx/css'
import BreadcrumbItem from 'reactstrap/lib/BreadcrumbItem'
import { colors } from '../../common/Constants'

import Breadcrumb from './TrefferBreadcrumb'
import BreadcrumbItem from './TrefferBreadcrumbItem'

const styles = css`
  div.treffer {
    padding-bottom: 6px;
  }

  div.treffer:hover {
    background-color: ${colors.hoverBackgroundColor};
    cursor: pointer;
  }

  div.treffer-outer {
    padding-bottom: 16px;
  }
`
export default ({ doc }) => {
  return (
    <div className="treffer-outer">
      <style jsx>{styles}</style>
      <SectionLink url={doc.kanonischeUrl}>
        <div className="treffer">
          <div>
            <div style={{ paddingBottom: 4 }}>
              <a href={doc.kanonischeUrl} style={{ fontWeight: 600 }}>
                {(doc.abkuerzung || '') + ' ' + doc.abkuerzungNorm}
              </a>
              <span style={{ fontWeight: 400, color: colors.primaryAction }}>
                {doc.titel ? ',  ' + doc.titel : ''}
              </span>
            </div>
            <div style={{}}>{doc.titelNorm}</div>
          </div>
        </div>
      </SectionLink>
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/suche?d=g">GesetzeDA</a>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <a href={doc.kanonischeUrlNorm}>{doc.abkuerzungNorm}</a>
        </BreadcrumbItem>
        <BreadcrumbItem style={{ color: colors.foregroundColor }}>
          <a>{doc.abkuerzung}</a>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  )
}
