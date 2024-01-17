/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiArrowLeft } from "@mdi/js";
import "../../styles/Game.css";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { constructUrl } from "../../Data";
import { useOutletContext } from "react-router-dom";
import { cartItems } from "../../Data";
import { useContext } from "react";
import AtcButton from "./AddToCartBtn";

function listToString(arr, attr = "name") {
  let res = "";
  if (!arr) return "unavailable";
  if (!Array.isArray(arr)) return arr[attr] + ".";
  for (let obj of arr) {
    if (obj[attr]) res += obj[attr] + ", ";
  }
  if (!res) return "unavailable";
  return res.slice(0, res.length - 2) + ".";
}

export default function Game() {
  const { slug } = useParams();
  const [currGamePrice] = useOutletContext();
  const [gameDetails, setGameDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  let [screenShots, setScreenShots] = useState(null);
  const { gamesInCart, setGamesInCart } = useContext(cartItems);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (gameDetails)
      setAddedToCart(gamesInCart.map((g) => g.name).includes(gameDetails.name));
  }, [gameDetails, gamesInCart]);

  useEffect(() => {
    fetch(constructUrl("", `games/${slug}`), { mode: "cors" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((data) => {
        setGameDetails(data);
        fetch(constructUrl("", `games/${slug}/screenshots`), { mode: "cors" })
          .then((res) => res.json())
          .then((res) => {
            setScreenShots(res.results);
          });
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [slug]);
  if (error)
    return <p style={{ color: "white" }}>A network error was encountered</p>;
  if (loading) return <p style={{ color: "white" }}>loading</p>;

  return (
    <>
      <section id="game-more">
        <header>
          <button>
            <Link to="/shop">
              <Icon path={mdiArrowLeft} size={1} />
              <span>Games</span>
            </Link>
          </button>
          {gameDetails && <span>{gameDetails.name}</span>}
        </header>
        <div className="game-info">
          <Carousel
            ariaLabel="pictures from the game"
            emulateTouch={true}
            useKeyboardArrows={true}
            centerMode={true}
            centerSlidePercentage={100}
          >
            {screenShots &&
              screenShots.map((i) => (
                <div key={i.id}>
                  <img src={i.image} alt={"images"} />
                </div>
              ))}
          </Carousel>
          {gameDetails && (
            <aside>
              <div className="description">{gameDetails.description_raw}</div>
              <div className="more">
                <div>
                  <span>Developers</span>
                  <span> {listToString(gameDetails.developers)}</span>
                </div>
                <div>
                  <span>ESRB Rating</span>
                  <span> {listToString(gameDetails.esrb_rating)}</span>
                </div>
                <div>
                  <span>Genres</span>
                  <span> {listToString(gameDetails.genres)}</span>
                </div>
                <div>
                  <span>Rating</span>
                  <span> {gameDetails.rating}/5</span>
                </div>
              </div>
              <div className="buying">
                <span>{currGamePrice}</span>
                <AtcButton
                  setAddedToCart={setAddedToCart}
                  addedToCart={addedToCart}
                  currentGame={{ ...gameDetails, price: currGamePrice }}
                  gamesInCart={gamesInCart}
                  setGamesInCart={setGamesInCart}
                />
              </div>
              <Link style={{ color: "var(--main)" }} to="/cart">
                Go to cart
              </Link>
            </aside>
          )}
        </div>
      </section>
    </>
  );
}
