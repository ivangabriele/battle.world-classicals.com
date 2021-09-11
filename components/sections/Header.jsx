import css from 'styled-jsx/css'

import EntityHeader from '../shared/EntityHeader'

const EntityHeaderPLaceholderStyle = css.resolve`
  div {
    opacity: 0.5;
    position: relative;
  }
`

export default function Header({ segment, title }) {
  return (
    <>
      <header className="bg-dark bg-size-cover overflow-hidden hero">
        <div className="container-fluid">
          <EntityHeader.Placeholder className={EntityHeaderPLaceholderStyle.className} />
          <EntityHeader.Box>
            <EntityHeader.Segment>{segment}</EntityHeader.Segment>
            <EntityHeader.Title>{title}</EntityHeader.Title>
          </EntityHeader.Box>
        </div>
      </header>

      {EntityHeaderPLaceholderStyle.styles}
      <style jsx>{`
        * {
          user-select: none;
        }

        div {
          padding: 0;
          position: relative;
        }
      `}</style>
    </>
  )
}
