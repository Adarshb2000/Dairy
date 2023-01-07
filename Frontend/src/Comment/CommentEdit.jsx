import { useMutation, useQueryClient } from '@tanstack/react-query'
import { edit, deleteComment } from './comment'
import { useParams } from 'react-router-dom'
import CommentForm from './CommentForm'
import { useContext } from 'react'
import LanguageContext from '../LanguageContext'

const CommentEdit = ({ oldData, closeForm }) => {
  const { tag } = useParams()
  const [lang] = useContext(LanguageContext)

  const query = useQueryClient()
  const editComment = useMutation(edit, {
    onSuccess: () => {
      window.location.reload()
    },
    onError: (err) => {
      alert(err.message)
    },
  })

  const deleteRecord = useMutation(deleteComment, {
    onSuccess: () => {
      window.location.reload()
    },
    onError: (err) => {
      alert(err.message)
    },
  })

  const formSubmission = (data) => {
    editComment.mutate({ data, tag, id: oldData.id })
  }

  return (
    <div className="flex flex-col">
      <CommentForm data={oldData} formSubmission={formSubmission} />
      <div className="flex justify-evenly">
        <button
          onClick={() => {
            deleteRecord.mutate({ tag, id: oldData.id })
          }}
          className="delete-button"
        >
          {lang ? 'Delete' : 'रिकॉर्ड हटाएं'}
        </button>
        <button
          className="buttons w-fit "
          onClick={() => {
            closeForm()
          }}
        >
          {lang ? 'Close' : 'बंद करें'}
        </button>
      </div>
    </div>
  )
}

export default CommentEdit
