import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { useOutletContext } from "react-router-dom";
import { cartItems } from "../../Data";
import { useContext, useState } from "react";
import AtcButton from "./AddToCartBtn";
/* eslint-disable react/prop-types */
// function handleAddToCart () {

// }
export default function Card({ game }) {
  const [, setCurrGamePrice] = useOutletContext();
  const { gamesInCart, setGamesInCart } = useContext(cartItems);
  const [addedToCart, setAddedToCart] = useState(
    gamesInCart.map((g) => g.name).includes(game.name)
  );
  return (
    <>
      <div className="card">
        <Link
          onClick={() => setCurrGamePrice(game.price)}
          to={`/shop/${game.slug}`}
        >
          <img className="image" src={game.background_image} alt={game.slug} />
        </Link>
        <div className="bottom">
          <div className="price">
            <AtcButton
              setAddedToCart={setAddedToCart}
              addedToCart={addedToCart}
              currentGame={game}
              gamesInCart={gamesInCart}
              setGamesInCart={setGamesInCart}
            />
            <span>{game.price}</span>
          </div>
          <Link
            onClick={() => setCurrGamePrice(game.price)}
            to={`/shop/${game.slug}`}
          >
            <div className="platforms">
              {game.platforms.map((p) => (
                <Icon path={p.icon} size={1} title={p.platform} key={p.slug} />
              ))}
            </div>
            <h3 className="name">{game.name}</h3>
          </Link>
        </div>
      </div>
    </>
  );
}
