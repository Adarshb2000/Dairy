import { useEffect, useState } from 'react'
import Modal from './Modal'
import { host } from './Helpers/config'

const Test = () => {
  const [showModal, setShowModal] = useState(false)
  useEffect(() => {
    const req = async () => {
      const res = await fetch(`${host}/abcd`)
      const ress = await res.json()
      console.log(ress)
    }
    req()
  })
  return (
    <div>
      <button onClick={() => setShowModal(true)}>Hey</button>
      {showModal ? (
        <Modal>
          <div
            style={{
              position: 'fixed',
              margin: 'auto',
            }}
          >
            Hello There!!
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Test
