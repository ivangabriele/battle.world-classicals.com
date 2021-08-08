function StandingsRow(standing) {
  const { name, rank, score } = standing

  return (
    <tr key={rank}>
      <th className="text-end" scope="row">
        {rank}
      </th>
      <td>{name}</td>
      <td className="text-end">{score}</td>
    </tr>
  )
}

export default function Standings({ data }) {
  return (
    <div className="table-responsive">
      <table className="table table-dark">
        <tbody>{data.map(StandingsRow)}</tbody>
      </table>
    </div>
  )
}
