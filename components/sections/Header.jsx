import EntityHeader from '../shared/EntityHeader'

export default function Header({ segment, title }) {
  return (
    <>
      <header className="bg-dark bg-size-cover overflow-hidden hero">
        <div className="container-fluid">
          <EntityHeader.Placeholder />
          <EntityHeader.Box>
            <EntityHeader.Segment>{segment}</EntityHeader.Segment>
            <EntityHeader.Title>{title}</EntityHeader.Title>
          </EntityHeader.Box>
        </div>
      </header>

      <style jsx>{`
        * {
          user-select: none;
        }

        div {
          position: relative;
        }
      `}</style>
    </>
  )
}
