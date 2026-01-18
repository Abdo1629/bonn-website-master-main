import HeroSlider from './components/Landing';
import Products from './components/Products';
import About from "./components/About"
import ContactUs from './components/Contact';
import StatsCarousel from './components/StatCards';
import ClientsSection from './components/ClientsSection';
import ArtVid from './components/ArtVid';
import CTAButton from './components/CTAButton';
import dynamic from "next/dynamic";

const OurMap = dynamic(() => import("./components/OurMap"), {
  ssr: false,
});


export default function Home() {
  return (
    <>
      <CTAButton />
      <HeroSlider />
      <StatsCarousel/>
      <About />
      <Products />
      <ClientsSection />
      <ArtVid />
      <OurMap />
      <ContactUs />
    </>
  );
}