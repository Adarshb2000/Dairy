const PregnancyDisplay = ({
  info: { copulation, examination, lactation, delivery },
  doubleClick,
}) => {
  return (
    <div className="flex overflow-x-auto lg:overflow-hidden">
      {/* Copulation Display */}
      {copulation ? (
        <div
          className="pregnancy-box min-w-fit bg-colour h-32 m-2"
          onDoubleClick={() => doubleClick(copulation, 0)}
        >
          <h2 className="heading3">Uthi</h2>
          {copulation.date ? (
            <label htmlFor="date">
              Date:{' '}
              <span>
                {new Date(copulation.date).toLocaleDateString('IN', {
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </label>
          ) : (
            <></>
          )}
          {copulation.worker ? (
            <label htmlFor="worker">
              Worker: <span>{copulation.worker}</span>
            </label>
          ) : (
            <></>
          )}
          {copulation.bullNumber ? (
            <label htmlFor="bullNumber">
              Bull Number: <span>{copulation.bullNumber}</span>
            </label>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}

      {/* Examination Display */}

      {examination ? (
        <div
          className="pregnancy-box min-w-fit bg-colour h-32 m-2"
          onDoubleClick={() => doubleClick(examination, 1)}
        >
          <h2 className="heading3">Test</h2>
          <label htmlFor="date">
            Date:{' '}
            <span>
              {new Date(examination.date).toLocaleDateString('IN', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
              })}
            </span>
          </label>
          <label htmlFor="doctor">
            Doctor: <span>{examination.doctor}</span>
          </label>
          {examination.duration ? (
            <label htmlFor="duration">
              Duration: {examination.duration} months
            </label>
          ) : (
            <></>
          )}
          <label htmlFor="isPregnant">
            {examination.isPregnant ? (
              <span className="text-green-600 font-bold">Pregnant</span>
            ) : (
              <span className="text-red-600 font-bold">Not Pregnant</span>
            )}
          </label>
        </div>
      ) : (
        <></>
      )}

      {/* Lactation Display */}

      {lactation ? (
        <div
          className="pregnancy-box justifying-start min-w-fit bg-colour h-32 m-2"
          onDoubleClick={() => doubleClick(lactation, 2)}
        >
          <h2 className="heading3">Chutai</h2>
          <label htmlFor="date">
            Date:{' '}
            <span>
              {new Date(lactation.date).toLocaleDateString('IN', {
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

      {/* Delivery Display */}

      {delivery ? (
        <div
          className="pregnancy-box bg-colour min-w-fit h-32 m-2"
          onDoubleClick={() => doubleClick(delivery, 3)}
        >
          <h2 className="heading3">Delivery</h2>
          <label htmlFor="number">
            Number: <span>{delivery.number}</span>
          </label>
          <label htmlFor="date">
            Date:{' '}
            <span>
              {new Date(delivery.date).toLocaleDateString('IN', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
              })}
            </span>
          </label>
          <label htmlFor="gender">
            Gender:{' '}
            <span>{delivery.gender === 'female' ? 'padiya' : 'pada'}</span>
          </label>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default PregnancyDisplay
