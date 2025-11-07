import HeroSlider from './components/Landing';
import Products from './components/Products';
import About from "./components/About"
import ContactUs from './components/Contact';
import StatsCarousel from './components/StatCards';
import ClientsSection from './components/ClientsSection';
import ArtVid from './components/ArtVid';

export default function Home() {
  return (
    <>
      <HeroSlider />
      <StatsCarousel/>
      <ArtVid />
      <About />
      <Products />
      <ClientsSection />
      <ContactUs />
    </>
  );
}