import { useRef } from 'react'
import { deleteDetails } from './Helper'

const DeleteButton = ({
  subRoute,
  body = {},
  navigate,
  text = 'Delete',
  alertDialog = 'Are you sure you want to delete this?',
}) => {
  const deleteTagConfirmation = useRef(false)

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          if (deleteTagConfirmation.current) {
            if (await deleteDetails(subRoute, body)) {
              alert('Delete was successful')
              navigate()
            }
          } else {
            alert(alertDialog)
            deleteTagConfirmation.current = true
            setTimeout(() => (deleteTagConfirmation.current = false), 2000)
          }
        } catch (error) {
          alert(error.message)
        }
      }}
      className="delete-button"
    >
      {text}
    </button>
  )
}

export default DeleteButton
