import ReactDOM from 'react-dom'
import { StrictMode, useState } from 'react'
import Home from './Home'
import LogIn from './LogIn'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NewRecord from './NewRecord'
import AddPregnancyRecord from './AddPregnancyRecord'
import AddDiseaseRecord from './AddDiseaseRecord'
import AddMilkRecord from './AddMilkRecord'
import SearchRecordOurStyle from './SearchRecordOurStyle'
import Test from './Test'
import SearchRecord from './SearchRecord'
import LanguageContext from './LanguageContext'
import NotFound from './NotFound'

const App = () => {
  const lang = useState(false)
  return (
    <LanguageContext.Provider value={lang}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/new-record/:animal/:tag" element={<NewRecord />} />
          <Route path="/new-record" element={<NewRecord />} />
          <Route path="/:animal/:tag" element={<SearchRecord />} />
          <Route path="/:animal/:tag" element={<SearchRecordOurStyle />} />
          <Route
            path="/add-complete-pregnancy/:animal/:tag"
            element={<AddPregnancyRecord />}
          />
          <Route
            path="/add-disease/:animal/:tag"
            element={<AddDiseaseRecord />}
          />
          <Route path="/add-milk" element={<AddMilkRecord />} />
          <Route element={<NotFound />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
    </LanguageContext.Provider>
  )
}
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)
