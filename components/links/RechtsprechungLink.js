import Link from 'next/link'

const RechtsprechungLink = (props) => (
  <Link
    {...props}
    as={props.url}
    href={`/rechtsprechung?kanonischeUrl=${props.url}`}
  />
)

export default RechtsprechungLink
