import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import EditorSection from '../components/EditorSection';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import WhyChooseUs from '../components/WhyChooseUs';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const timer = setTimeout(() => {
        const el = document.getElementById(location.hash.slice(1));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <>
      <Hero />
      <EditorSection />
      <Features />
      <HowItWorks />
      <WhyChooseUs />
      <FAQ />
      <CTA />
    </>
  );
}
