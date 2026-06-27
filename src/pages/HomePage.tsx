import Navbar from '../components/Navbar'
import OceanScene from '../components/OceanScene'
import HeroSection from '../components/HeroSection'
import ProofSection from '../components/ProofSection'
import AboutSection from '../components/AboutSection'
import ProcessSection from '../components/ProcessSection'
import ServicesSection from '../components/ServicesSection'
import FAQSection from '../components/FAQSection'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <OceanScene>
        {(scrollProg) => (
          <>
            <HeroSection scrollProg={scrollProg} />
            <ProofSection />
            <AboutSection />
            <ProcessSection />
          </>
        )}
      </OceanScene>
      <ServicesSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
