import Image, { ImageProps } from 'next/image'
import PropTypes from 'prop-types'

function Background({ alt, darkening, image, imagePath }) {
  const isPath = imagePath !== null

  return (
    <>
      <div className="Background">
        <div>
          {!isPath && <Image alt={alt} layout="fill" objectFit="cover" placeholder="blur" quality={60} src={image} />}
          {isPath && <Image alt={alt} layout="fill" objectFit="cover" quality={60} src={imagePath} />}
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
  image: null,
  imagePath: null,
}

Background.propTypes = {
  alt: PropTypes.string.isRequired,
  darkening: PropTypes.number,
  image: PropTypes.shape(ImageProps),
  imagePath: PropTypes.string,
}

export default Background
