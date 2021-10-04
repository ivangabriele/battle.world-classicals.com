import Link from 'next/link'
import { Fragment } from 'react'

export default function Entry({ date, id, intro, slug, time, title }) {
  return (
    <Fragment key={id}>
      <div className="box">
        <Link href={`/${slug}`}>
          <div className="entry">
            <p>{intro}</p>
            <h2>{title}</h2>
            <time dateTime={time}>{date}</time>
          </div>
        </Link>
      </div>

      <style jsx>{`
        .entry {
          background-image: url('/articles/${id}.jpg');
        }
      `}</style>

      <style jsx>{`
        .box {
          padding: 2rem 0 0 0;
          max-width: 100%;
        }
        @media (min-width: 768px) {
          .box {
            padding: 1rem;
            max-width: 50%;
          }
        }
        @media (min-width: 992px) {
          .box {
            max-width: 33.33%;
          }
        }

        .entry {
          background-color: black;
          background-position: top;
          background-repeat: no-repeat;
          background-size: cover;
          cursor: pointer;
          display: flex;
          flex-direction: column-reverse;
          height: 100%;
          overflow: hidden;
          padding: 1rem;
          position: relative;
          text-align: left;
          transition-duration: 0.2s;
          transition-property: all;
          transition-timing-function: ease-in-out;
          user-select: none;
          width: 100%;
        }
        .entry:after {
          background: rgba(18, 17, 23, 0.9);
          content: ' ';
          height: 100%;
          left: 0;
          opacity: 0.5;
          position: absolute;
          top: 0;
          transition-duration: 0.2s;
          transition-property: opacity;
          transition-timing-function: ease-in-out;
          width: 100%;
        }
        .entry:hover {
          box-shadow: 0 0 0.5rem rgba(255, 0, 0, 0.25);
          transform: scale(1.02);
          z-index: 100;
        }
        .entry:hover:after {
          opacity: 1;
        }

        p {
          color: rgba(255, 255, 255, 0.75);
          height: 7rem;
          margin: 0;
          opacity: 0;
          text-shadow: 0 0 1rem black;
          transform: translateY(1rem);
          transition-duration: 0.5s;
          transition-property: height, opacity, transform;
          transition-timing-function: ease;
          z-index: 2;
        }
        .entry:hover > p {
          opacity: 1;
          transform: translateY(0);
        }

        h2 {
          color: white;
          font-size: 21px;
          font-weight: 500;
          padding: 0.25rem 0 0 0;
          text-shadow: 0 0 1rem black;
          text-transform: none;
          z-index: 2;
        }

        time {
          color: rgba(255, 255, 255, 0.5);
          display: block;
          font-size: 12px;
          font-weight: 300;
          text-shadow: 0 0 1rem black;
          text-transform: uppercase;
          z-index: 2;
        }
      `}</style>
    </Fragment>
  )
}
