import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Test from './Test'
import LanguageContext from './LanguageContext'
import Login from './Auth/Login'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './Home/Home'
import SearchRecord from './Record/SearchRecord'
import MilkDetails from './Milk/MilkDetails'
import DiseaseDetails from './Disease/DiseaseDetails'
import PregnancyDetails from './Pregnancy/PregnancyDetails'
import NewRecord from './Record/NewRecord'
import EditRecord from './Record/EditRecord'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      staleTime: Infinity,
      retry: 0,
    },
  },
})

const App = () => {
  const lang = useState(false)
  return (
    <div className="flex h-screen w-screen flex-col justify-start bg-grey0">
      <LanguageContext.Provider value={lang}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <div className="mb-2 w-full bg-rose-200 p-4 text-center">
              <div id="navbar">
                <Link to={'/'} className="text-2xl font-bold">
                  Baderia Dariy
                </Link>
              </div>
            </div>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/new-record" element={<NewRecord />} />
              <Route path="/new-record/:tag?" element={<NewRecord />} />
              <Route path="/edit-record/:tag" element={<EditRecord />} />
              <Route path="/test" element={<Test />} />
              <Route path="/" element={<Home />} />
              <Route path="/:tag" element={<SearchRecord />} />
              <Route path="/pregnancy/:tag" element={<PregnancyDetails />} />
              <Route path="/milk/:tag" element={<MilkDetails />} />
              <Route path="/disease/:tag" element={<DiseaseDetails />} />
            </Routes>
          </QueryClientProvider>
        </BrowserRouter>
      </LanguageContext.Provider>
    </div>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
