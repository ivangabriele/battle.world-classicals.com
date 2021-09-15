import PropTypes from 'prop-types'
import css from 'styled-jsx/css'

import EntityHeader from '../shared/EntityHeader'

function Header({ backgroundImagePath, segment, title }) {
  const hasBackground = backgroundImagePath !== null

  const EntityHeaderPLaceholderStyle = css.resolve`
    div {
      background-color: ${hasBackground ? 'black' : 'transparent'};
      opacity: ${hasBackground ? 0.85 : 1};
      position: relative;
    }
  `

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

      <style jsx>{`
        header {
          background-image: ${hasBackground ? `url('${backgroundImagePath}')` : 'none'};
        }
      `}</style>

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

Header.defaultProps = {
  backgroundImagePath: null,
}

Header.propTypes = {
  backgroundImagePath: PropTypes.string,
  segment: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default Header
