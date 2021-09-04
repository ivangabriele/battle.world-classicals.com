export default function Separator() {
  return (
    <>
      <div />

      <style jsx>{`
        div {
          align-items: center;
          display: flex;
          flex-direction: row;
          height: 1px;
          margin: 2rem 0px 1rem 0px;
          width: 100%;
        }
        div:after {
          background-color: rgba(255, 255, 255, 0.1);
          content: '';
          height: 90%;
          width: 100%;
        }
        @media (min-width: 992px) {
          div {
            height: 100%;
            margin: 0;
            width: 1px;
          }
        }
      `}</style>
    </>
  )
}
