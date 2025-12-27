import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Engineers from './pages/Engineers';
import EngineerPortfolio from './pages/EngineerPortfolio';
import Contribute from './pages/Contribute';
import Contact from './pages/Contact';

function App() {
  useEffect(() => {
    document.title = 'TechHive Studio - Building Scalable Software & Digital Excellence';
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/engineers" element={<Engineers />} />
            <Route path="/engineer/:id" element={<EngineerPortfolio />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
