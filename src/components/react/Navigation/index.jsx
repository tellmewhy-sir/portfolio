import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

export default function Navigation({ links }) {
  const [prevSteps, setPrevSteps] = useState(0);
  const [prevActive, setPrevActive] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currActive, setCurrActive] = useState({ title: 'dev', href: '/' });
  const [menuCenter, setMenuCenter] = useState(1);
  const nameRef = useRef(null);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const highlightRef = useRef(null);

  useEffect(() => {
    if (!navRef.current) return;
    let activeItem = navRef.current.querySelector('.active');

    if (window.screen.width > 768) {
      highlightMenuItem(activeItem);
    } else {
      highlightMenuItem(nameRef.current);
    }
    let menuCenter = navRef.current.offsetTop;
    setMenuCenter(menuCenter);
  }, [currActive, setCurrActive]);

  const highlightMenuItem = (item) => {
    let x = item.offsetLeft;
    let y = item.offsetTop;
    let w = item.clientWidth;
    let h = item.offsetHeight;

    highlightRef.current.style.left = `${x - 8}px`;
    highlightRef.current.style.top = `${y - 8}px`;
    highlightRef.current.style.width = `${w + 24}px`;
    highlightRef.current.style.height = `${h + 12}px`;
  };

  const handleClick = (e, link) => {
    if (window.screen.width < 768) {
        setMenuOpen(false);
    }
    animateActiveTab(e.target);
    setCurrActive(link);
  };

  const handleMenuButtonClick = () => {
    if (window.screen.width > 768) return;
    setMenuOpen(!menuOpen);
  }

  const animateActiveTab = (item) => {
    let nextItemOrder = parseInt(item.dataset.order);
    let currActiveItem = navRef.current.querySelector('.active a');
    let currActiveOrder = prevActive
      ? parseInt(currActiveItem.dataset.order)
      : 1;
    setPrevActive(currActive);

    let itemHeight = currActiveItem.clientHeight + 16;
    let stepsFromBase = nextItemOrder - currActiveOrder;

    let scrollDistance = Math.abs(stepsFromBase * itemHeight);
    if (stepsFromBase > 0) {
      scrollDistance = -scrollDistance;
    }

    if (prevSteps) {
      let prev = parseInt(prevSteps);
      scrollDistance += prev;
    }
    menuRef.current.style.transform = `translateY(${scrollDistance}px)`;
    setPrevSteps(scrollDistance);
  };

  return (
    <>
      <nav className="flex items-start relative" ref={navRef}>
        <button 
            ref={nameRef}
            className='menu-btn relative'
            onClick={handleMenuButtonClick}>
                <span className='z-10'>delutilo.</span>
            </button>
        <ul
          className={`menu flex flex-col gap-4 items-start z-10 relative ${
            menuOpen ? 'open' : ''
          }`}
          ref={menuRef}
        >
          {links
            .sort((a, b) => a.menuOrder - b.menuOrder)
            .map((link) => (
              <li
                className={`menu-item ${
                  link.title === currActive.title ? 'active' : ''
                }`}
                key={link.title}
              >
                <a
                  href={link.href}
                  className="block"
                  data-order={link.menuOrder}
                  onClick={(e) => handleClick(e, link)}
                  onMouseOver={(e) => highlightMenuItem(e.target)}
                  onMouseLeave={() =>
                    highlightMenuItem(navRef.current.querySelector('.active'))
                  }
                >
                  {link.title}
                </a>
              </li>
            ))}
          <span
            className={`slider hidden md:block ${prevActive ? 'highlighted' : ''}`}
            ref={highlightRef}
          ></span>
        </ul>
        {/* {
                    !menuOpen && (
                        <div
                            className="absolute top-0 left-0 right-0 bottom-0 md:hidden z-30"
                            onClick={() => setMenuOpen(true)}></div>
                    )
                } */}
      </nav>
      {(
        <div className={`overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)}></div>
      )}
    </>
  );
}
