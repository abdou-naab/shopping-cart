/* eslint-disable react/prop-types */

import { Notif } from "../../Data";
import { useContext } from "react";
export default function AtcButton({
  setAddedToCart,
  addedToCart,
  gamesInCart,
  setGamesInCart,
  currentGame,
}) {
  const { notif, setNotif } = useContext(Notif);

  return (
    <>
      <button
        style={addedToCart ? { color: "var(--main)" } : {}}
        onClick={(event) => {
          event.stopPropagation();
          if (!addedToCart) {
            if (!gamesInCart.map((g) => g.name).includes(currentGame.name))
              setGamesInCart((gamesInCartPrev) => [
                ...gamesInCartPrev,
                {
                  img: currentGame.background_image,
                  name: currentGame.name,
                  price: currentGame.price,
                  count: 1,
                },
              ]);
            setAddedToCart(true);
            setNotif(notif + 1);
          } else {
            setGamesInCart((gamesInCartPrev) =>
              gamesInCartPrev.filter((i) => i.name != currentGame.name)
            );
            setAddedToCart(false);
            setNotif(notif - 1);
          }
        }}
      >
        {addedToCart ? "Added" : "Add to cart +"}
        {addedToCart ? <>&#10003;</> : <></>}
      </button>
    </>
  );
}
