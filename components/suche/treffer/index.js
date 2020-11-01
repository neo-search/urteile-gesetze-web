import TrefferSection from './TrefferSection'
import TrefferSectionSmallNorm from './TrefferSectionSmallNorm'
import TrefferRechtsprechung from './TrefferRechtsprechung'

const isRechtsprechung = (doc) => {
  return doc.docType == 'rechtsprechung'
}

const isSection = (doc) => {
  return doc.docType == 'norm'
}

const isSectionOfSmallNorm = (doc) => {
  return doc.docType == 'norm' && doc.smallNorm
}

const isGesetz = (doc) => {
  return doc.docType == 'gesetzbuch'
}

const Index = ({ doc }) => {
  if (isRechtsprechung(doc)) return <TrefferRechtsprechung doc={doc} />

  if (isSectionOfSmallNorm(doc)) return <TrefferSectionSmallNorm doc={doc} />

  if (isSection(doc)) return <TrefferSection doc={doc} />
};

export default Index;
