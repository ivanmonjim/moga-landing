import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import Servicios from "./components/sections/Servicios";
import Precios from "./components/sections/Precios";
import PorQueMoga from "./components/sections/PorQueMoga";
import Contacto from "./components/sections/Contacto";

export default function App() {
  return (
    <div className="min-h-screen bg-bg-main">
      <Header />
      <main>
        <Hero />
        <Servicios />
        <Precios />
        <PorQueMoga />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
}
