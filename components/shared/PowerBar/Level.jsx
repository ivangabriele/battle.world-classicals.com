export default function Level({ description, label, level }) {
  return (
    <>
      <div className="Level">
        <span>{label}</span>
        <div className="bar">
          <div className="level" />
        </div>

        <div className="tooltip">
          <h4>{label}</h4>
          <p>{description}</p>
        </div>
      </div>

      <style jsx>{`
        div.level {
          animation-name: grow;
          max-width: ${level * 100}%;
        }

        @keyframes grow {
          0% {
            max-width: 0;
          }
          100% {
            max-width: ${level * 100}%;
          }
        }
      `}</style>
      <style jsx>{`
        div.Level {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          max-width: 30%;
          min-width: 30%;
          padding: 0.5rem;
          position: relative;
        }
        div.Level * {
          opacity: 0.75;
          transition-duration: 0.25s;
          transition-property: all;
          transition-timing-function: ease-out;
        }
        div.Level:hover * {
          opacity: 1;
        }

        span {
          color: white;
          font-family: var(--font-label);
          font-size: 85%;
          font-weight: 700;
          letter-spacing: 0.05rem;
          margin-bottom: 0.5rem;
        }

        div.bar {
          background-color: black;
          display: flex;
          flex-grow: 1;
        }

        div.level {
          animation-delay: 0s;
          animation-duration: 2s;
          animation-iteration-count: 1;
          animation-timing-function: ease-out;
          background-color: white;
          box-shadow: 0px 0px 0.25rem rgba(255, 255, 255, 0.5);
          flex-grow: 1;
          min-height: 0.5rem;
          opacity: 0.9;
        }

        div.tooltip {
          background-color: #9ea1d8;
          bottom: 3rem;
          clip-path: polygon(
            0 0,
            0 calc(100% - 0.75rem),
            calc(15% - 0.75rem) calc(100% - 0.75rem),
            15% 100%,
            calc(15% + 0.75rem) calc(100% - 0.75rem),
            100% calc(100% - 0.75rem),
            100% 0
          );
          display: none;
          flex-direction: column;
          left: 0;
          padding: 0.75rem 1rem 0.5rem 1rem;
          position: absolute;
          width: 100%;
        }
        div.tooltip > h4 {
          color: black;
          font-size: 130%;
        }
        div.tooltip > p {
          color: black;
        }
        div.Level:hover > div.tooltip {
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
