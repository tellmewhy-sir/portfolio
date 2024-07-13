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
  const menuActiveRef = useRef(null);
  const highlightRef = useRef(null);

  useEffect(() => {
    if (!navRef.current) return;

    let activeItem = navRef.current.querySelector('.active');

    if (window.screen.width > 768) {
      // highlightMenuItem(activeItem);
    } else {
      // highlightMenuItem(nameRef.current);
    }
    // let menuCenter = navRef.current.offsetTop;
    // setMenuCenter(menuCenter);
  }, [currActive, setCurrActive]);

  const highlightMenuItem = (item) => {
    const menu = menuActiveRef.current;
    
    const {offsetTop, offsetHeight, offsetWidth, offsetLeft} = item;
    const clipTop = offsetTop
    const clipBottom = offsetTop + offsetHeight;
    const clipLeft = offsetLeft;
    const clipRight = offsetLeft + offsetWidth;
  
    const insetTop = Number((clipTop / menu.offsetHeight) * 100).toFixed();
    const insetRight = Number(100 - ((clipRight+16) / menu.offsetWidth) * 100).toFixed();
    const insetBottom = Number(100 - (clipBottom / menu.offsetHeight) * 100).toFixed();
    const insetLeft = Number(((clipLeft-16) / menu.offsetWidth) * 100).toFixed();

    menu.style.clipPath = `inset(${insetTop}% ${insetRight}% ${insetBottom}% ${insetLeft}% round 20px)`
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
    menuActiveRef.current.style.transform = `translateY(${scrollDistance}px)`;
    setPrevSteps(scrollDistance);
  };

  return (
    <>
      <nav className="flex items-start relative" ref={navRef}>
        {/* <button 
            ref={nameRef}
            className={`menu-btn relative z-20 ${prevActive ? 'highlighted' : ''}`}
            onClick={handleMenuButtonClick}>
                <span>delutilo.</span>
            </button> */}
        <ul
          className={`menu flex flex-col gap-4 items-start z-10 relative pr-4 pl-4 ${
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
                  // onMouseLeave={() =>
                  //   highlightMenuItem(navRef.current.querySelector('.active'))
                  // }
                >
                  {link.title}
                </a>
              </li>
            ))}
        </ul>
        <ul
          className={`menu menu-active flex flex-col gap-4 items-start pr-4 pl-4 z-20 ${
            menuOpen ? 'open' : ''
          }`}
          ref={menuActiveRef}
        >
          {links
            .sort((a, b) => a.menuOrder - b.menuOrder)
            .map((link) => (
              <li
                className="menu-item"
                key={link.title}
              >
                <a
                  href={link.href}
                  className="block"
                  data-order={link.menuOrder}
                  onClick={(e) => handleClick(e, link)}
                  // onMouseOver={(e) => highlightMenuItem(e.target)}
                  // onMouseLeave={() =>
                  //   highlightMenuItem(navRef.current.querySelector('.active'))
                  // }
                >
                  {link.title}
                </a>
              </li>
            ))}
        </ul>
      </nav>
      {(
        <div className={`overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)}></div>
      )}
    </>
  );
}
