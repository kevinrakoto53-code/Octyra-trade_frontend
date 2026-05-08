import Background from "./components/landing/Background";
import Hero from "./components/landing/Hero";
import NavBar from "./components/landing/NavBar";
import Feat from "./components/landing/Feat"
import HowItsWorks from "./components/landing/HowItsWorks"
import Testimonials from "./components/landing/Testimonials";
import Pricing from "./components/landing/Pricing";
import Action from "./components/landing/Action";
import Footer from "./components/landing/Footer";


export default function Home() {
  return (
    <main>
      <section className="relative w-full h-screen overflow-hidden">
        <div className="page-glow" />
        <Background />
        <NavBar />
        <Hero />
      </section>

      <section >
        <Feat/>
      </section>
      <section>
        <HowItsWorks/>
        <Testimonials/>
        <Pricing/>
        <Action/>
        <Footer/>
      </section>
    </main>
  );
}