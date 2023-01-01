const MilkDisplay = ({ info }) => {
  return (
    <div
      className="pregnancy-box items-center h-auto w-full"
      hidden={!info.length}
    >
      <table className="table-auto bg-white w-full max-w-[300px]">
        <thead>
          <tr className="bg-rose-400">
            <th className="border border-rose-400 text-white">Sr.</th>
            <th className="border border-rose-400 text-white">L. N.</th>
            <th className="border border-rose-400 text-white">Date</th>
            <th className="border border-rose-400 text-white">Milk</th>
          </tr>
        </thead>
        <tbody>
          {info.map(({ lineNumber, date, milk }, index) =>
            lineNumber && date && milk ? (
              <tr key={index}>
                <td className="border border-rose-400 text-center">
                  {index + 1}
                </td>
                <td className="border border-rose-400 text-center">
                  {lineNumber}
                </td>
                <td className="border border-rose-400 text-center">
                  {new Date(date).toLocaleDateString('hi-In', {
                    day: '2-digit',
                    month: '2-digit',
                  })}
                </td>
                <td className="border border-rose-400 text-center">{milk}</td>
              </tr>
            ) : (
              <></>
            )
          )}
        </tbody>
      </table>
    </div>
  )
}

export default MilkDisplay
