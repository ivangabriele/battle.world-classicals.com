import Blockquote from './Blockquote'
import Intro from './Intro'
import Link from './Link'
import Pararaph from './Pararaph'

function Article({ children }) {
  return (
    <>
      <div>
        <article className="Article">{children}</article>
      </div>

      <style jsx>{`
        div {
          display: flex;
          flex-direction: row;
          justify-content: center;
        }

        article.Article {
          animation-name: move;
          animation-duration: 1.5s;
          color: white;
          font-family: var(--font-content);
          font-size: 21px;
          font-weight: 200;
          max-width: 680px;
        }

        @keyframes move {
          0% {
            opacity: 0;
            transform: translateY(300px);
          }
          100% {
            opacity: 1;
            transform: translateY(0px);
          }
        }
      `}</style>
    </>
  )
}

export default Object.assign(Article, {
  Blockquote,
  Intro,
  Link,
  Pararaph,
})
