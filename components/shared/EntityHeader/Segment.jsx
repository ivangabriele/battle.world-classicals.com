export default function Segment({ children }) {
  return (
    <>
      <div>
        <h2>{children}</h2>
        <span />
      </div>

      <style jsx>{`
        div {
          display: none;
        }
        @media (min-width: 992px) {
          div {
            align-items: center;
            animation-delay: 0s;
            animation-duration: 1s;
            animation-iteration-count: 1;
            animation-name: move;
            animation-timing-function: ease-out;
            display: flex;
            flex-direction: row;
            opacity: 0.25;
            transform-origin: bottom left;
            transform: rotate(270deg);
            display: flex;
            width: 15rem;
          }
        }
        @keyframes move {
          0% {
            transform: translateY(-90px) rotate(270deg);
            opacity: 0;
          }
          100% {
            transform: translateY(0px) rotate(270deg);
            opacity: 0.25;
          }
        }

        h2 {
          color: white;
          font-family: var(--font-base);
          font-size: 100%;
          font-weight: 400;
          letter-spacing: 3px;
          margin: 0;
          text-shadow: 0 0 0.25rem black;
        }

        span {
          background-color: white;
          box-shadow: 0 0 0.5rem black;
          display: block;
          flex-grow: 1;
          height: 1px;
          margin: 0 0.5rem 0 0.25rem;
        }
      `}</style>
    </>
  )
}
