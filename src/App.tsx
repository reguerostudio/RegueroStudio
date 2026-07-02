import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import PrivacyPage from './pages/PrivacyPage'
import InmersoPortfolioPage from './pages/InmersoPortfolioPage'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/privacidad" element={<PrivacyPage />} />
        <Route path="/inmerso/portfolio" element={<InmersoPortfolioPage />} />
      </Routes>
    </>
  )
}

export default App
