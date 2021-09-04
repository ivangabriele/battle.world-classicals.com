export default function Figure({ icon, label, value }) {
  const iconUrl = `/icons/${icon}.svg`

  return (
    <>
      <div className="Figure">
        <span>{value}</span>
        <img alt={label} src={iconUrl} />

        <div className="tooltip">
          <h4>{label}</h4>
        </div>
      </div>

      <style jsx>{`
        div.Figure {
          cursor: pointer;
          display: flex;
          align-items: center;
          flex-direction: column;
          position: relative;
        }
        div.Figure * {
          opacity: 0.75;
          transition-duration: 0.25s;
          transition-property: all;
          transition-timing-function: ease-out;
        }
        div.Figure:hover * {
          opacity: 1;
        }

        span {
          align-items: center;
          color: white;
          display: flex;
          font-size: 200%;
          font-weight: 700;
          height: 3rem;
          justify-content: center;
          line-height: 1;
          width: 6rem;
        }

        img {
          fill-color: white;
          height: 2rem;
          margin-top: 0.5rem;
          width: 2rem;
        }

        div.tooltip {
          background-color: #9ea1d8;
          bottom: 5.5rem;
          clip-path: polygon(
            0 0,
            0 calc(100% - 0.5rem),
            calc(50% - 0.5rem) calc(100% - 0.5rem),
            50% 100%,
            calc(50% + 0.5rem) calc(100% - 0.5rem),
            100% calc(100% - 0.5rem),
            100% 0
          );
          display: none;
          left: 50%;
          padding: 0.5rem 0.75rem 0.4rem 0.75rem;
          position: absolute;
          transform: translateX(-50%);
        }
        div.tooltip > h4 {
          color: black;
          font-size: 120%;
          white-space: nowrap;
        }
        div.Figure:hover > div.tooltip {
          animation-delay: 0s;
          animation-duration: 0.25s;
          animation-iteration-count: 1;
          animation-name: appear;
          animation-timing-function: ease-out;
          display: flex;
          opacity: 1;
        }

        @keyframes appear {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}
