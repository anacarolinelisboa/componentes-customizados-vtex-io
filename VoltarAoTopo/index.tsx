// @ts-ignore
import React, { useEffect, useState } from 'react';
// @ts-ignore
import "./style.css";

export const VoltarAoTopo = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      setShowButton(scrollPosition > 400);

      const body = document.querySelector('body');
      
      if (body instanceof HTMLElement) { 
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        if ((scrollPosition + windowHeight >= documentHeight - 100)) {
          body.classList.add('fim-da-pagina');
        } else {
          body.classList.remove('fim-da-pagina');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    showButton && (
      <button
        id="btn-volta-ao-topo"
        onClick={scrollToTop} 
        aria-label="Voltar ao topo" 
      ></button>  
    )
  )
} 
