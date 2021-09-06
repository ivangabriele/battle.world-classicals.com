import Blockquote from './Blockquote'
import Link from './Link'
import Pararaph from './Pararaph'

function Article({ children }) {
  return (
    <>
      <article className="Article">{children}</article>

      <style jsx>{`
        article.Article {
          animation-name: move;
          animation-duration: 1.5s;
          color: white;
          font-family: var(--font-content);
          font-size: 21px;
          font-weight: 300;
          margin: 0 auto;
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
  Link,
  Pararaph,
})
