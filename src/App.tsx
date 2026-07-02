import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import PrivacyPage from './pages/PrivacyPage'
import InmersoPortfolioPage from './pages/InmersoPortfolioPage'
import NotFoundPage from './pages/NotFoundPage'
import InmersoDepthMeter from './components/InmersoDepthMeter'
import InmersoCursorTrail from './components/InmersoCursorTrail'
import InmersoSoundToggle from './components/InmersoSoundToggle'

function App() {
  return (
    <>
      <ScrollToTop />
      <InmersoCursorTrail />
      <InmersoDepthMeter />
      <InmersoSoundToggle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/privacidad" element={<PrivacyPage />} />
        <Route path="/inmerso/portfolio" element={<InmersoPortfolioPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
