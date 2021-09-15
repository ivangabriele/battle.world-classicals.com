import Image, { ImageProps } from 'next/image'
import PropTypes from 'prop-types'

function Background({ alt, darkening, image }) {
  return (
    <>
      <div className="Background">
        <div>
          <Image alt={alt} layout="fill" objectFit="cover" placeholder="blur" quality={60} src={image} />
        </div>
      </div>
      <div className="Darkener" />

      <style jsx>{`
        .Darkener {
          opacity: ${darkening};
        }
      `}</style>

      <style jsx>{`
        .Background,
        .Darkener {
          height: 100%;
          left: 0;
          padding: 0;
          position: absolute;
          top: 0;
          width: 100%;
        }

        .Background > div {
          height: 100%;
          position: relative;
          width: 100%;
        }

        .Darkener {
          background-color: black;
        }
      `}</style>
    </>
  )
}

Background.defaultProps = {
  darkening: 0.85,
}

Background.propTypes = {
  alt: PropTypes.string.isRequired,
  darkening: PropTypes.number,
  image: PropTypes.shape(ImageProps).isRequired,
}

export default Background
