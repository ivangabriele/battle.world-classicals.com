import { ImageProps } from 'next/image'
import PropTypes from 'prop-types'

import EntityHeader from '../shared/EntityHeader'

function Header({ backgroundImage, segment, title }) {
  const hasBackgroundImage = backgroundImage !== null

  return (
    <>
      <header>
        <EntityHeader.Placeholder image={backgroundImage} />
        {hasBackgroundImage && <EntityHeader.Background alt={title} image={backgroundImage} />}
        <EntityHeader.Box>
          <EntityHeader.Segment>{segment}</EntityHeader.Segment>
          <EntityHeader.Title>{title}</EntityHeader.Title>
        </EntityHeader.Box>
      </header>

      <style jsx>{`
        * {
          user-select: none;
        }

        header {
          background-position: center;
          background-size: cover;
          overflow: hidden;
          position: relative;
        }
      `}</style>
    </>
  )
}

Header.defaultProps = {
  backgroundImage: null,
}

Header.propTypes = {
  backgroundImage: PropTypes.shape(ImageProps),
  segment: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default Header
