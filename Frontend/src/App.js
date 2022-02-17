import ReactDOM from 'react-dom'
import Home from './Home'
import LogIn from './LogIn'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NewRecord from './NewRecord'
import SearchRecord from './SearchRecord'
import AddPregnancyRecord from './AddPregnancyRecord'
import AddDiseaseRecord from './AddDiseaseRecord'
import AddMilkRecord from './AddMilkRecord'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/new-record" element={<NewRecord />} />
        <Route path="/:animal/:tag" element={<SearchRecord />} />
        <Route
          path="/add-complete-pregnancy/:animal/:tag"
          element={<AddPregnancyRecord />}
        />
        <Route
          path="/add-disease/:animal/:tag"
          element={<AddDiseaseRecord />}
        />
        <Route path="/add-milk" element={<AddMilkRecord />} />
      </Routes>
    </Router>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
