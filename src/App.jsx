import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      {/* define routes so <Link> and useLocation work */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<div className="mt-20 p-4">Events (coming soon)</div>} />
        <Route path="/explore" element={<div className="mt-20 p-4">Explore (coming soon)</div>} />
        <Route path="/contact" element={<div className="mt-20 p-4">Contact (coming soon)</div>} />
        {/* add additional routes as needed */}
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
