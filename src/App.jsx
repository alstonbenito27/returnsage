import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import Features from '../Components/Features';
import RowFlex from '../Components/Rowflex';
import Pricing from '../Components/Pricing';
import Footer from '../Components/Footer';
import Demo from '../Components/Demo'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Waitlist from '../Components/BookWaitlist';

const LandingPage = () => (
  <div>
      <Navbar />
      <Hero />
      <Features />
      <RowFlex />
      <Pricing />
      <Footer />
  </div>
);


const App = () => {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/waitlist" element={<Waitlist/>} />
            </Routes>
        </Router>
  );
}

export default App;
