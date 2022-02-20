const DiseaseDisplay = ({ info }) => {
  return (
    <div className="flex">
      {info.cured ? (
        <div className="pregnancy-box bg-colour-green h-32 m-2 text-white font-bold text-center">
          OK
        </div>
      ) : (
        <div className="pregnancy-box bg-colour-red h-32 m-2 text-white font-bold text-center">
          <span>NOT</span>
          <span>OK</span>
        </div>
      )}
      <div className="flex w-11/12 overflow-x-scroll">
        {info.vaccination.map((ele, index) => (
          <div className="pregnancy-box bg-colour h-32 m-2" key={index}>
            <label htmlFor="date">
              Date:
              <span>
                {new Date(ele.date).toLocaleDateString('hi-IN', {
                  day: 'numeric',
                  month: 'numeric',
                  year: '2-digit',
                })}
              </span>
            </label>
            <label htmlFor="vaccine">
              Vaccine:
              <span>{ele.vaccine}</span>
            </label>
            <label htmlFor="doctor">
              Doctor:<span>{ele.doctor}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DiseaseDisplay