import Icon from "@mdi/react";
import { mdiCart } from "@mdi/js";
import "../../styles/Shop.css";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DataContext, Notif } from "../../Data";
import Card from "./Card";

const handleOnSearch = (string, results, data, setGamesDisplayed) => {
  // replaced this part with the useEffect just in case the component is broken someway
  /*if (string.trim().length == 0) {
    setGamesDisplayed(data);
    return;
  }*/
  let idsToDisplay = results.map((i) => i.id);
  setGamesDisplayed(data.filter((i) => idsToDisplay.includes(i.id)));
};
const handleOnSelect = (item, data, setGamesDisplayed) => {
  setGamesDisplayed(data.filter((i) => i.id == item.id));
};

export default function Shop() {
  const formatSearchResult = (item) => {
    return (
      <>
        <p style={{ fontSize: "10px", textAlign: "center", display: "block" }}>
          {item.name}
        </p>
      </>
    );
  };
  const { data, error, loading } = useContext(DataContext);
  const { notif } = useContext(Notif);

  const [gamesDisplayed, setGamesDisplayed] = useState(data);
  useEffect(() => {
    if (gamesDisplayed.length == 0) setGamesDisplayed(data);
  }, [data, gamesDisplayed]);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 520);

  useEffect(() => {
    window.addEventListener("resize", () =>
      setIsSmallScreen(window.innerWidth <= 520)
    );
    return () => {
      window.removeEventListener("resize", () =>
        setIsSmallScreen(window.innerWidth <= 520)
      );
    };
  }, []);

  return (
    <>
      <section id="shop">
        <header>
          <div className="search">
            <ReactSearchAutocomplete
              onSearch={(s, r) => handleOnSearch(s, r, data, setGamesDisplayed)}
              onSelect={(r) => handleOnSelect(r, data, setGamesDisplayed)}
              onClear={() => setGamesDisplayed(data)}
              items={data}
              autoFocus
              formatResult={formatSearchResult}
              styling={{ zIndex: 9 }}
            />
          </div>
          <Link to="/cart">
            <button className="cart">
              {isSmallScreen ? "" : "Cart"}
              <Icon path={mdiCart} title="cart" color="var(--main)"></Icon>
              {/** add the following as a context state variable */}
              {notif > 0 && <div className="notification">{notif}</div>}
            </button>
          </Link>
        </header>
        <article id="cards">
          {error && (
            <p style={{ color: "white" }}>A network error was encountered</p>
          )}
          {loading && <p style={{ color: "white" }}>loading</p>}
          {gamesDisplayed &&
            gamesDisplayed.map((d) => <Card key={d.id} game={d} />)}
        </article>
      </section>
    </>
  );
}
