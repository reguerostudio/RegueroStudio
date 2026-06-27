import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import PrivacyPage from './pages/PrivacyPage'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/privacidad" element={<PrivacyPage />} />
      </Routes>
    </>
  )
}

export default App
