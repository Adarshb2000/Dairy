const PregnancyDisplay = ({ info }) => {
  return Object.keys(info).length > 1 ? (
    <div className="flex overflow-x-scroll lg:overflow-hidden">
      {info.copulation ? (
        <div className="pregnancy-box min-w-fit bg-colour h-32 m-2">
          <h2 className="heading3">Uthi</h2>
          {info.copulation.date ? (
            <label htmlFor="date">
              Date:{' '}
              <span>
                {new Date(info.copulation.date).toLocaleDateString('IN', {
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </label>
          ) : (
            <></>
          )}
          {info.copulation.worker ? (
            <label htmlFor="worker">
              Worker: <span>{info.copulation.worker}</span>
            </label>
          ) : (
            <></>
          )}
          {info.copulation.bullNumber ? (
            <label htmlFor="bullNumber">
              Bull Number: <span>{info.copulation.bullNumber}</span>
            </label>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      {info.examination ? (
        <div className="pregnancy-box min-w-fit bg-colour h-32 m-2">
          <h2 className="heading3">Test</h2>
          <label htmlFor="date">
            Date:{' '}
            <span>
              {new Date(info.examination.date).toLocaleDateString('IN', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
              })}
            </span>
          </label>
          <label htmlFor="doctor">
            Doctor: <span>{info.examination.doctor}</span>
          </label>
          {info.examination.duration ? (
            <label htmlFor="duration">{info.examination.duration}</label>
          ) : (
            <></>
          )}
          <label htmlFor="isPregnant">
            {info.examination.isPregnant ? (
              <span className="text-green-600 font-bold">Pregnant</span>
            ) : (
              <span className="text-red-600 font-bold">Not Pregnant</span>
            )}
          </label>
        </div>
      ) : (
        <></>
      )}
      {info.lactation ? (
        <div className="pregnancy-box justifying-start min-w-fit bg-colour h-32 m-2">
          <h2 className="heading3">Chutai</h2>
          <label htmlFor="date">
            Date:{' '}
            <span>
              {new Date(info.lactation.date).toLocaleDateString('IN', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
              })}
            </span>
          </label>
        </div>
      ) : (
        <></>
      )}
      {info.delivery ? (
        <div className="pregnancy-box bg-colour min-w-fit h-32 m-2">
          <h2 className="heading3">Delivery</h2>
          <label htmlFor="number">
            Number: <span>{info.delivery.number}</span>
          </label>
          <label htmlFor="date">
            Date:{' '}
            <span>
              {new Date(info.delivery.date).toLocaleDateString('IN', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
              })}
            </span>
          </label>
          <label htmlFor="gender">
            Gender:{' '}
            <span>{info.delivery.gender === 'female' ? 'padiya' : 'pada'}</span>
          </label>
        </div>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  )
}

export default PregnancyDisplay
