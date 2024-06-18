import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

export default function Navigation({ links }) {
    const [prevSteps, setPrevSteps] = useState(0);
    const [prevActive, setPrevActive] = useState(null);
    const [currActive, setCurrActive] = useState({ title: 'dev', href: '/' });
    const [menuCenter, setMenuCenter] = useState(1);
    const nameRef = useRef(null);
    const navRef = useRef(null);
    const menuRef = useRef(null);
    const highlightRef = useRef(null);

    useEffect(() => {
        if (!navRef.current) return;
        let activeItem = navRef.current.querySelector('.active');
        highlightMenuItem(activeItem);
        let menuCenter = navRef.current.offsetTop;
        setMenuCenter(menuCenter);
    }, [currActive, setCurrActive])

    const highlightMenuItem = (item) => {
        let x = item.offsetLeft;
        let y = item.offsetTop;
        let w = item.clientWidth;
        let h = item.offsetHeight;

        highlightRef.current.style.left = `${x}px`;
        highlightRef.current.style.top = `${y}px`;
        highlightRef.current.style.width = `${w}px`;
        highlightRef.current.style.height = `${h}px`;
    }

    const handleClick = (e, link) => {
        // if (e.target.tagName === 'A') return;
        animateActiveTab(e.target);
        setCurrActive(link)
    }

    const animateActiveTab = (item) => {
        let nextItemOrder = parseInt(item.dataset.order);
        let currActiveItem = navRef.current.querySelector('.active a');
        let currActiveOrder = prevActive ? parseInt(currActiveItem.dataset.order) : 1;
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
    }

    return (
        <nav className="flex" ref={navRef}>
            <span ref={nameRef}>delutilo.</span>
            <ul className="menu flex flex-col gap-4 items-start z-10 relative" ref={menuRef} transition:name="menu">
                {
                    links
                        .sort((a, b) => a.menuOrder - b.menuOrder)
                        .map((link => (
                        <li
                            className={`menu-item ${link.title === currActive.title ? 'active' : ''}`}
                            key={link.title}>
                            <a
                                href={link.href}
                                className="block"
                                data-order={link.menuOrder}
                                onClick={(e) => handleClick(e, link)}
                                onMouseOver={(e) => highlightMenuItem(e.target)}
                                onMouseLeave={() => highlightMenuItem(navRef.current.querySelector('.active'))}
                                >
                            {link.title}
                            </a>
                        </li>
                    )))
                }
                <span className="slider" ref={highlightRef}></span>
            </ul>
        </nav>
    )
}