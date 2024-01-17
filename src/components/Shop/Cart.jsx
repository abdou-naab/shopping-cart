/* eslint-disable react/prop-types */
import Icon from "@mdi/react";
import {
  mdiPlusCircle,
  mdiMinusCircle,
  mdiArrowLeft,
  mdiDelete,
} from "@mdi/js";
import { cartItems } from "../../Data";
import { useContext, useState, useEffect } from "react";
import "../../styles/Cart.css";
import { Link } from "react-router-dom";

const getItemCountfromCartArr = (arr, name) => {
  for (let item of arr) if (item.name == name) return item.count;
};

function CartItem({ item }) {
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

  const price = parseFloat(item.price.slice(0, item.price.length - 2));
  const [itemCount, setItemCount] = useState(1);
  const { gamesInCart, setGamesInCart } = useContext(cartItems);
  function handleAddItem() {
    setItemCount(Math.min(itemCount + 1, 7));
    setGamesInCart(
      gamesInCart.map((g) => {
        if (g.name == item.name) g.count = Math.min(itemCount + 1, 7);
        return g;
      })
    );
  }
  function handleSubtractItem() {
    setItemCount(Math.max(itemCount - 1, 1));
    setGamesInCart(
      gamesInCart.map((g) => {
        if (g.name == item.name) g.count = Math.max(itemCount - 1, 1);
        return g;
      })
    );
  }
  function handleRemoveGame() {
    setGamesInCart(gamesInCart.filter((i) => i.name != item.name));
  }

  return (
    <>
      <article className="cart-item">
        <img src={item.img} alt="item" />
        <div className="cart-item-body">
          <span className="name">{item.name}</span>
          <span>Price: {item.price}</span>
          <span>
            Total: {price * getItemCountfromCartArr(gamesInCart, item.name)} $
          </span>

          <div className="controls">
            <div onClick={handleSubtractItem}>
              <Icon path={mdiMinusCircle} title="remove" />
            </div>
            <span>{itemCount}</span>
            <div onClick={handleAddItem}>
              <Icon path={mdiPlusCircle} title="add" />
            </div>
            {isSmallScreen && (
              <div>
                <Icon className="remove-icon" path={mdiDelete} title="Remove" />
              </div>
            )}
          </div>
        </div>

        {!isSmallScreen && (
          <button className="remove" onClick={handleRemoveGame}>
            Remove
          </button>
        )}
      </article>
    </>
  );
}

export default function Cart() {
  const { gamesInCart, setGamesInCart } = useContext(cartItems);

  return (
    <section id="cart">
      <header>
        <button>
          <Link to="/shop">
            <Icon path={mdiArrowLeft} size={1} />
            <span>Games</span>
          </Link>
        </button>
        <button onClick={() => setGamesInCart([])}>Clear the Cart</button>
      </header>
      {gamesInCart.length == 0 && (
        <p style={{ fontSize: "1.2rem", color: "var(--grey)" }}>
          Do Some shopping first!
        </p>
      )}
      {gamesInCart && gamesInCart.length > 0 && (
        <>
          {gamesInCart.map((item) => (
            <CartItem key={item.name} item={item} />
          ))}
          <div className="checkout-area">
            <div>
              <span>SubTotal: </span>
              <span>
                {gamesInCart.reduce(
                  (prev, curr) =>
                    prev +
                    curr.count *
                      parseFloat(curr.price.slice(0, curr.price.length - 2)),
                  0
                )}{" "}
                $
              </span>
            </div>
            <button
              onClick={() =>
                alert(
                  "Don't look at me like that... it's a routing project...\n "
                )
              }
            >
              {" "}
              Checkout{" "}
            </button>
          </div>
        </>
      )}
    </section>
  );
}
