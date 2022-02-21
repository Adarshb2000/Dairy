import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { logout } from './Helper'

const Home = () => {
  const navigate = useNavigate()
  const [animal, setAnimal] = useState()
  const [tag, setTag] = useState(0)
  const [loading, setLoading] = useState(true)

  const formSubmit = async (e) => {
    //search for a record
    e.preventDefault()
    if (animal && tag) {
      navigate(`/${animal}/${tag}`, { replace: true })
    } else if (!animal) {
      alert('invalid animal')
    } else {
      alert('invalid tag number')
    }
  }

  const verifyToken = async () => {
    try {
      const ret = await fetch('http://192.168.29.235:1235/api/verifyToken', {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      })
      if (!ret.ok) throw new Error('Invalid')
      // else setLoading(false)
    } catch (e) {
      navigate('/login', { replace: true })
    }
  }

  useEffect(() => {
    verifyToken()
  })

  return loading ? (
    <>Loading...</>
  ) : (
    <div className="wrapper">
      <form className="box2" onSubmit={formSubmit}>
        <h4 className="heading1"> SEARCH RECORD </h4>
        <div className="box3">
          <label htmlFor="animal">
            Animal:
            <select
              className="inputs"
              id="animal"
              name="Animal"
              onChange={(e) => setAnimal(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Select
              </option>
              <option value="cow">Cow</option>
              <option value="buffalo">Buffalo</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag No.:
            <input
              className="inputs"
              onChange={(e) => setTag(e.target.value)}
              id="tag"
              name="Tag"
              value={tag}
              type="number"
              min={0}
            />
          </label>
        </div>
        <button className="buttons" type="submit">
          search
        </button>
      </form>
      <hr />
      <br />
      <button className="buttons2">
        <Link to={'/new-record'}>add new record</Link>
      </button>
      <br />
      <hr />
      <br />
      <Link to="/cow/1">cow 1</Link>
      <button
        className="buttons2"
        onClick={() => {
          logout(navigate)
        }}
      >
        logout
      </button>
    </div>
  )
}

export default Home
