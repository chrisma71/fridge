import React, { useEffect, useState } from 'react';

const NavBar: React.FC = () => {
  const [bgColor, setBgColor] = useState('#C1E1C1');

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'bottom') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

    const percentageScrolled = scrollY / documentHeight;

    if (percentageScrolled < 0.33) {
      setBgColor('#A6E3A6'); // Light Green
    } else if (percentageScrolled < 0.66) {
      setBgColor('#FFBECA'); // Light Pink
    } else {
      setBgColor('#ADD9EA'); // Light Blue
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className="w-full p-4 fixed top-0 z-50 transition-colors duration-500"
      style={{ backgroundColor: bgColor }}
    >
      <ul className="flex justify-center space-x-8 text-xl font-bold font-mali text-black">
        <li
          className="cursor-pointer transform transition-transform duration-300 hover:-translate-y-[-2px] hover:scale-105"
          onClick={() => scrollToSection('home')}
        >
          Home
        </li>
        <li
          className="cursor-pointer transform transition-transform duration-300 hover:-translate-y-[-2px] hover:scale-105 "
          onClick={() => scrollToSection('features')}
        >
          Features
        </li>
        <li
          className="cursor-pointer transform transition-transform duration-300 hover:-translate-y-[-2px] hover:scale-105 "
          onClick={() => scrollToSection('bottom')}
        >
          Start Now!
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
