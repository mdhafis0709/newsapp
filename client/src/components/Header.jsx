import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import countries from "./countries";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [active, setActive] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [theme, setTheme] = useState("light-theme");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  let category = ["business", "entertainment", "general", "health", "science", "sports", "technology", "politics"];

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function toggleTheme() {
    setTheme(theme === "light-theme" ? "dark-theme" : "light-theme");
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <header className="">
      <nav className={`fixed top-0 left-0 w-full h-auto ${theme === "light-theme" ? "bg-gray-800" : "bg-gray-900"} z-10 flex items-center justify-around`}>
        <h3 className="relative heading font-bold text-3xl xs:basis-4/12 z-50 mb-5 mt-5">GLOBAL NEWS PLATFORM</h3>

        {/* Date and Time Display */}
         <div className="flex  flex-col items-center  justify-center text-center">
          <div className={`text-xl  font-bold ${theme === "light-theme" ? "text-white" : "text-gray-100"}`}>
            {formatDate(currentDateTime)}
          </div>
          <div className={`text-xl  font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text`}>
            {formatTime(currentDateTime)}
          </div>
        </div>

        <ul className={active ? "nav-ul flex gap-11 md:gap-14 xs:gap-12 lg:basis-3/6 md:basis-4/6 md:justify-end active" : "nav-ul flex gap-14 lg:basis-3/6 md:basis-4/6 justify-end"}>
          <li><Link className="no-underline font-semibold" to="/" onClick={() => setActive(!active)}>All News</Link></li>
          <li className="dropdown-li"><Link className="no-underline font-semibold flex items-center gap-2" onClick={() => { setShowCategoryDropdown(!showCategoryDropdown); setShowCountryDropdown(false) }}>Top-Headlines <FontAwesomeIcon className={showCategoryDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} icon={faCircleArrowDown} /></Link>
            <ul className={showCategoryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
              {category.map((element, index) => (
                <li key={index} onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}>
                  <Link to={"/top-headlines/" + element} className="flex gap-3 capitalize" type="btn" onClick={() => setActive(!active)}>
                    {element}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="dropdown-li"><Link className="no-underline font-semibold flex items-center gap-2" onClick={() => { setShowCountryDropdown(!showCountryDropdown); setShowCategoryDropdown(false) }}>Country <FontAwesomeIcon className={showCountryDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} icon={faCircleArrowDown} /></Link>
            <ul className={showCountryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
              {countries.map((element, index) => (
                <li key={index} onClick={() => setShowCountryDropdown(!showCountryDropdown)}>
                  <Link to={"/country/" + element?.iso_2_alpha} className="flex gap-3" type="btn" onClick={() => setActive(!active)}>
                    <img src={element?.png} srcSet={`https://flagcdn.com/32x24/${element?.iso_2_alpha}.png 2x`} alt={element?.countryName} />
                    <span>{element?.countryName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <button onClick={toggleTheme} className="no-underline font-semibold">
              {theme === "light-theme" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>
          </li>
        </ul>

        <div className={active ? "ham-burger z-index-100 ham-open" : "ham-burger z-index-100"} onClick={() => setActive(!active)}>
          <span className="lines line-1"></span>
          <span className="lines line-2"></span>
          <span className="lines line-3"></span>
        </div>
      </nav>
    </header>
  );
}

export default Header;