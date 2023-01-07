import { useMutation, useQueryClient } from '@tanstack/react-query'
import { create } from './comment'
import { useParams } from 'react-router-dom'
import CommentForm from './CommentForm'
import { useContext } from 'react'
import LanguageContext from '../LanguageContext'

const CommentCreate = ({ closeForm }) => {
  const { tag } = useParams()
  const [lang] = useContext(LanguageContext)

  const query = useQueryClient()
  const createComment = useMutation(create, {
    onSuccess: (newData) => {
      query.setQueryData([tag, tag], (oldData) => {
        oldData.data.comments.unshift(newData.data)
      })
      closeForm()
    },
  })

  const formSubmission = (data) => {
    createComment.mutate({ data, tag })
  }

  return (
    <div className="flex flex-col">
      <CommentForm formSubmission={formSubmission} />
      <button
        className="buttons w-fit self-center"
        onClick={() => {
          closeForm()
        }}
      >
        {lang ? 'Close' : 'बंद करें'}
      </button>
    </div>
  )
}

export default CommentCreate
