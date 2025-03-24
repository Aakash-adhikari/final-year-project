import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HeroSection from './components/HeroSection'; 
import HowItWorks from './components/HowItWorks';
import FeaturedServices from './components/FeaturedServices';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import CTASection from './components/CTASection';

const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <HeroSection />  
        <HowItWorks />
        <FeaturedServices />
        <WhyChooseUs />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
