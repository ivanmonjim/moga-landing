import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import Confianza from "./components/sections/Confianza";
import Servicios from "./components/sections/Servicios";
import Integracion from "./components/sections/Integracion";
import Precios from "./components/sections/Precios";
import PorQueMoga from "./components/sections/PorQueMoga";
import ComoFunciona from "./components/sections/ComoFunciona";
import GaleriaSistemas from "./components/sections/GaleriaSistemas";
import FAQ from "./components/sections/FAQ";
import Contacto from "./components/sections/Contacto";

export default function App() {
  return (
    <div className="min-h-screen bg-bg-main">
      <Header />
      <main>
        <Hero />
        <Confianza />
        <Servicios />
        <Integracion />
        <PorQueMoga />
        <ComoFunciona />
        <GaleriaSistemas />
        <Precios />
        <FAQ />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
}
