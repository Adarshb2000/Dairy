import { useContext, useState } from 'react'
import Modal from '../Modal'
import MilkEditForm from './EditForm/MilkEditForm'
import LanguageContext from '../LanguageContext'
import MilkCreateForm from './CreateForm/MilkCreateForm'

const Milk = ({ data }) => {
  const [lang] = useContext(LanguageContext)
  const [editForm, showEditForm] = useState(false)
  const [createForm, showCreateForm] = useState(false)
  const [id, setId] = useState(null)
  const [details, setDetails] = useState({})

  const highest = data.reduce(
    (prev, { milk }) => Math.max(prev, milk),
    -Infinity
  )

  return (
    <div className="pregnancy-box bg-colour">
      <h2 className="heading2">Milk</h2>
      <div className="pregnancy-box">
        {data.length ? (
          <div className="pregnancy-box h-auto w-full items-center">
            <div className="mb-1 rounded-lg bg-white px-3 py-2">
              <h2 className="heading2">
                Highest
                <span className="heading1 mx-2">{highest.toFixed(2)}</span>
              </h2>
              <h2 className="heading2">
                Average
                <span className="heading1 mx-2">
                  {(
                    data.reduce((prev, { milk }) => prev + milk, 0) /
                    data.length
                  ).toFixed(2)}
                </span>
              </h2>
            </div>
            <table className="w-full max-w-[300px] table-auto bg-white">
              <thead>
                <tr className="bg-rose-400">
                  <th className="border border-rose-400 text-white">Sr.</th>
                  <th className="border border-rose-400 text-white">L. N.</th>
                  <th className="border border-rose-400 text-white">Date</th>
                  <th className="border border-rose-400 text-white">Milk</th>
                </tr>
              </thead>
              <tbody>
                {data.map(({ lineNumber, date, milk, id }, index) => (
                  <tr
                    key={id}
                    className={milk === highest ? 'bg-rose-100' : ''}
                    onClick={() => {
                      setId(id)
                      setDetails({ lineNumber, date, milk })
                      showEditForm(true)
                    }}
                  >
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
                        year: '2-digit',
                      })}
                    </td>
                    <td className="border border-rose-400 text-center">
                      {milk}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        {editForm ? (
          <Modal>
            <div className="text-center">
              <MilkEditForm
                id={id}
                data={details}
                closeForm={() => showEditForm(false)}
              />
            </div>
          </Modal>
        ) : null}
        {createForm ? (
          <Modal>
            <div className="text-center">
              <MilkCreateForm
                data={{ ...data[0] }}
                closeForm={() => showCreateForm(false)}
              />
              <button
                className="buttons mt-1"
                onClick={() => {
                  showCreateForm(false)
                }}
              >
                {lang ? 'Close' : 'बंद करें'}
              </button>
            </div>
          </Modal>
        ) : null}
        <div className="text-center">
          <button className="buttons" onClick={() => showCreateForm(true)}>
            {lang ? 'Add Milk' : 'दूध जोड़ें'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Milk
