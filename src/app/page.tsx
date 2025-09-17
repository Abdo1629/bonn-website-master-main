import HeroSlider from './components/Landing';
import Products from './components/Products';
import About from "./components/About"
import ContactUs from './components/Contact';
import StatsCarousel from './components/StatCards';
import ClientsSection from './components/ClientsSection';

export default function Home() {
  return (
    <>
      <HeroSlider />
      <StatsCarousel/>
      <About />
      <Products />
      <ClientsSection />
      <ContactUs />
    </>
  );
}