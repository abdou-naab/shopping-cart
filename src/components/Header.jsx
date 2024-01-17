import logo from "../assets/logo.png";
import "../styles/Header.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
// eslint-disable-next-line react/prop-types
export default function Header({ setJoinActive, setShopActive }) {
  const join_li = useRef(null);
  const shop_li = useRef(null);
  const home_li = useRef(null);

  function handleActiveTab(ref) {
    document.querySelector("header li.active").classList.remove("active");
    ref.current.classList.add("active");
    if (join_li.current.classList.contains("active")) setJoinActive(true);
    else setJoinActive(false);
    if (shop_li.current.classList.contains("active")) setShopActive(true);
    else setShopActive(false);
  }

  return (
    <>
      <header>
        <Link to="/">
          <img
            onClick={() => handleActiveTab(home_li)}
            className="logo"
            src={logo}
            alt="The Muslim Gamer League Logo"
          ></img>
        </Link>

        <nav>
          <ul>
            <li
              onClick={() => handleActiveTab(home_li)}
              ref={home_li}
              className="active"
            >
              <Link to="/">Home</Link>
            </li>
            <li onClick={() => handleActiveTab(shop_li)} ref={shop_li}>
              <Link to="shop">Shop</Link>
            </li>
            <li onClick={() => handleActiveTab(join_li)} ref={join_li}>
              <Link to="join">Join Now</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
