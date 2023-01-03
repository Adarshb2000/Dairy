import { useEffect } from 'react'

const NotFound = () => {
  useEffect(() => setTimeout(() => (window.location.href = '/'), 2000), [])
  return (
    <div className="wrapper">
      <div className="pregnancy-box">
        <span className="heading1">NOT FOUND</span>
        <span className="heading1">going back</span>
      </div>
    </div>
  )
}

export default NotFound
