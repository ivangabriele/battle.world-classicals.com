export const AWARD_TYPE = {
  FIRST: 'FIRST',
  SECOND: 'SECOND',
  THIRD: 'THIRD',
}

const resolveType = type => {
  switch (type) {
    case AWARD_TYPE.FIRST:
      return { className: 'first', symbol: '1' }

    case AWARD_TYPE.SECOND:
      return { className: 'second', symbol: '2' }

    case AWARD_TYPE.THIRD:
      return { className: 'third', symbol: '3' }

    default:
      return { className: '', symbol: '?' }
  }
}

export default function Award({ count, type }) {
  const { className, symbol } = resolveType(type)

  return (
    <>
      <div className="box">
        <div className={className}>
          <span className={className}>{symbol}</span>
        </div>
        <p>x {count}</p>
      </div>

      <style jsx>{`
        div.box {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 0 0 1.5rem;
        }

        div.first,
        div.second,
        div.third {
          align-items: center;
          border: solid 1px transparent;
          box-shadow: 0px 0px 1rem rgba(255, 255, 255, 0.2);
          display: flex;
          height: 3rem;
          justify-content: center;
          overflow: visible;
          position: relative;
          transition-duration: 0.5s;
          transition-property: all;
          transition-timing-function: ease-out;
          width: 3rem;
        }
        div.box:hover > div {
          box-shadow: 0px 0px 1rem rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        span {
          font-family: var(--font-title);
          font-size: 200%;
          font-weight: 700;
          line-height: 1;
          margin: 0;
        }

        p {
          color: rgba(255, 255, 255, 0.75);
          font-size: 80%;
          margin: 0.5rem 0 0 0;
          text-shadow: 0 0 0.25rem black;
          transition-duration: 0.5s;
          transition-property: all;
          transition-timing-function: ease-out;
        }
        div.box:hover > p {
          color: rgba(255, 255, 255, 1);
          transform: scale(1.1) translateY(0.25rem);
        }

        div.first {
          border-image: linear-gradient(120deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
          border-image-slice: 1;
        }
        span.first {
          background: linear-gradient(217deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        div.second {
          border-image: linear-gradient(120deg, #aaa9ad, #fefdff, #e1e0e4, #ffffff, #c5c4c8);
          border-image-slice: 1;
        }
        span.second {
          background: linear-gradient(217deg, #aaa9ad, #fefdff, #e1e0e4, #ffffff, #c5c4c8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        div.third {
          border-image: linear-gradient(120deg, #e9c38a, #ffdea4, #cca770, #fffbc0, #b08d57);
          border-image-slice: 1;
        }
        span.third {
          background: linear-gradient(217deg, #e9c38a, #ffdea4, #cca770, #fffbc0, #b08d57);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </>
  )
}
