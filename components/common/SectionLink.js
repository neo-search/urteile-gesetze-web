import Link from 'next/link'

export default (props) => (
  <Link
    {...props}
    as={props.url}
    href={`/section?kanonischeUrl=${props.url}`}
  />
)
