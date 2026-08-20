import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('wordhtml-dark');
      if (saved !== null) return saved === 'true';
    } catch (e) {}
    return true;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try { localStorage.setItem('wordhtml-dark', String(darkMode)); } catch (e) {}
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-surface-950 transition-colors">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
