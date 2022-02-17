import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { logout } from './Helper'
const Home = () => {
  const navigate = useNavigate()
  const [animal, setAnimal] = useState()
  const [tag, setTag] = useState(0)

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
  return (
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
      <Link to="/add-milk">add milk record</Link>
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
