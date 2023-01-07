import { useContext, useState } from 'react'
import LanguageContext from '../LanguageContext'
import Modal from '../Modal'
import CommentCreate from './CommentCreate'
import { displayDate } from '../Helpers/helperFunctions'
import CommentEdit from './CommentEdit'

const Comments = ({ comments = [] }) => {
  const [lang] = useContext(LanguageContext)
  const [form, showForm] = useState(false)
  const [editForm, showEditForm] = useState(false)
  const [editData, setEditData] = useState({})

  return (
    <div className="pregnancy-box bg-colour">
      <h2 className="heading2">Comments</h2>
      <div className="pregnancy-box">
        <div className="max-h-40 overflow-auto">
          {comments.map(({ comment, date, worker, id }) => (
            <button
              className={`my-1 flex w-full items-center justify-start overflow-x-hidden rounded-lg bg-rose-500 p-2 px-2 text-white hover:font-bold`}
              key={id}
              onClick={() => {
                setEditData({ comment, date, worker, id })
                showEditForm(true)
              }}
            >
              <div className="flex flex-col text-left">
                <span>
                  <label htmlFor="comment" className="font-semibold text-black">
                    {lang ? 'Comment' : 'जानकारी'}:{' '}
                  </label>
                  {comment}
                  <label htmlFor="date">
                    {`${
                      date
                        ? '(' + displayDate({ date, year: '2-digit' }) + ')'
                        : null
                    }`}
                  </label>
                </span>
                {worker ? (
                  <span>
                    <label htmlFor="worker">
                      <span className="font-semibold text-black">
                        {lang ? 'Worker' : 'कर्मचारी'}:&nbsp;
                      </span>
                      {worker}
                    </label>
                  </span>
                ) : null}
              </div>
            </button>
          ))}
        </div>
        <button
          className="buttons w-fit self-center"
          onClick={() => showForm(true)}
        >
          {lang ? 'Add Comment' : 'जानकारी जोड़ें'}
        </button>
        {form ? (
          <Modal>
            <CommentCreate closeForm={() => showForm(false)} />
          </Modal>
        ) : null}
        {editForm ? (
          <Modal>
            <CommentEdit
              closeForm={() => showEditForm(false)}
              oldData={editData}
            />
          </Modal>
        ) : null}
      </div>
    </div>
  )
}

export default Comments
