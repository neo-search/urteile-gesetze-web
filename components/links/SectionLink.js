import Link from 'next/link'

const SectionLink = (props) => (
  <Link
    {...props}
    as={props.url}
    href={`/section?kanonischeUrl=${props.url}`}
  />
)

export default SectionLink
