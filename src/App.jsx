import "./App.css";
import Header from "./components/Header";
import Intro from "./components/Intro";
import About from "./components/About";
import Footer from "./components/Footer";
// import Shop from "./components/Shop/Shop";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { cartItems, Notif } from "./Data.jsx";

function App() {
  const [joinActive, setJoinActive] = useState(false);
  const [shopActive, setShopActive] = useState(false);
  const [currGamePrice, setCurrGamePrice] = useState(null);
  const [gamesInCart, setGamesInCart] = useState([]);
  const [notif, setNotif] = useState(0);
  useEffect(() => {
    if (joinActive) {
      document.querySelector("body").classList.add("join_bg");
    } else document.querySelector("body").classList.remove("join_bg");
  }, [joinActive]);
  return (
    <>
      <cartItems.Provider value={{ gamesInCart, setGamesInCart }}>
        <Notif.Provider value={{ notif, setNotif }}>
          <Header setJoinActive={setJoinActive} setShopActive={setShopActive} />
          <main>
            {!shopActive && <Intro />}
            {(joinActive || shopActive) && (
              <Outlet context={[currGamePrice, setCurrGamePrice]} />
            )}
            {!joinActive && !shopActive && <About />}
          </main>
          <Footer />
        </Notif.Provider>
      </cartItems.Provider>
    </>
  );
}

export default App;
