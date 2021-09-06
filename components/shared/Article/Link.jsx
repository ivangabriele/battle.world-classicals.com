import Link from 'next/link'

export default function Pararaph({ children, href }) {
  return (
    <>
      <Link href={href}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>{children}</a>
      </Link>
    </>
  )
}
