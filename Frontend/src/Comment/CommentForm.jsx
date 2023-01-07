import { useContext } from 'react'
import DateElement from '../Custom/DateElement'
import LanguageContext from '../LanguageContext'

const CommentForm = ({ data = {}, formSubmission }) => {
  const [lang] = useContext(LanguageContext)

  return (
    <form
      className="box4 mt-4 rounded-xl bg-white px-4 py-2 text-left"
      onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        formSubmission({
          comment: formData.get('comment'),
          date: new Date(formData.get('date')),
          worker: formData.get('worker'),
        })
      }}
    >
      <div className="pregnancy-box pregnancy-forms h-80 sm:h-60">
        <label htmlFor="worker my-2">
          {lang ? 'Comment' : 'जानकारी'}:
          <input
            type="text"
            name="comment"
            defaultValue={data.comment || ''}
            className="inputs w-48"
            required={true}
            autoComplete={'no'}
          />
        </label>
        <DateElement
          label={lang ? 'Date' : 'दिनांक'}
          name="date"
          defaultValue={new Date(data.date || Date())}
          lang={lang}
        />
        <label htmlFor="worker">
          {lang ? 'Worker' : 'कर्मचारी'}:
          <input
            type="text"
            name="worker"
            defaultValue={data.worker || ''}
            className="inputs mb-2 w-48"
          />
        </label>
        <button type="submit" className="buttons w-full min-w-fit self-center">
          {lang ? 'Submit' : 'जमा करें।'}
        </button>
      </div>
    </form>
  )
}

export default CommentForm
