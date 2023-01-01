import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const Navbar = ({ children }) => {
  const elRef = useRef(null)
  if (!elRef.current) {
    elRef.current = document.createElement('div')
  }
  useEffect(() => {
    const modalRoot = document.getElementById('navbar')
    modalRoot.appendChild(elRef.current)

    return () => modalRoot.removeChild(elRef.current)
  }, [])

  return createPortal(children, elRef.current)
}

export default Navbar
