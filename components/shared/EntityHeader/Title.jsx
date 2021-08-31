export default function Title({ children }) {
  return (
    <>
      <h1>{children}</h1>

      <style jsx>{`
        h1 {
          animation-delay: 0s;
          animation-duration: 1s;
          animation-iteration-count: 1;
          animation-name: move;
          animation-timing-function: ease-out;
          color: white;
          font-family: Cinzel;
          font-size: 150%;
          font-weight: 500;
          letter-spacing: 0.25rem;
          margin: -2rem 0 0 0;
          max-width: 80%;
          opacity: 1;
          text-transform: capitalize;
        }
        @media (min-width: 992px) {
          h1 {
            align-self: start;
            font-size: 200%;
            margin: 1rem 0 0 -13rem;
          }
        }
        @keyframes move {
          0% {
            transform: translateY(2rem);
            opacity: 0;
          }
          100% {
            transform: translateY(0px);
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}
