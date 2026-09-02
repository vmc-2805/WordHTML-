import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import WhyChooseUs from '../components/WhyChooseUs';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import { useSEO } from '../hooks/useSEO';

export default function Home() {
  const location = useLocation();

  useSEO({
    title: 'Word to HTML Converter - Free Online Tool | WordConvertHTML',
    description: 'Free online Word to HTML converter. Paste your Word document content, get clean, semantic HTML instantly. No installation, no sign-up. 100% private — runs in your browser.',
    canonical: 'https://wordconverthtml.com'
  });

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
      <Features />
      <HowItWorks />
      <WhyChooseUs />
      <FAQ />
      <CTA />
    </>
  );
}
