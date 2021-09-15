import classnames from 'classnames'
import css from 'styled-jsx/css'

import EntityHeader from '../shared/EntityHeader'

export default function Header({ className, segment, title }) {
  const headerClassName = classnames('bg-dark bg-size-cover overflow-hidden hero', className)

  const EntityHeaderPLaceholderStyle = css.resolve`
    div {
      background-color: ${className ? 'black' : 'transparent'};
      opacity: ${className ? 0.85 : 1};
      position: relative;
    }
  `

  return (
    <>
      <header className={headerClassName}>
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

        header {
          background-position: center;
          background-size: cover;
        }

        div {
          padding: 0;
          position: relative;
        }
      `}</style>
    </>
  )
}
