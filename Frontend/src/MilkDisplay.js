const MilkDisplay = ({ info }) => {
  return (
    <div hidden={!info.length}>
      <div className="pregnancy-box h-auto sm:mx-10">
        <table className="table-auto bg-white">
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
                      day: 'numeric',
                      month: 'numeric',
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
    </div>
  )
}

export default MilkDisplay
