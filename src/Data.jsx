import { useState, useEffect, createContext } from "react";
import {
  mdiMicrosoftWindows,
  mdiMicrosoftXbox,
  mdiNintendoSwitch,
  mdiSonyPlaystation,
} from "@mdi/js";

function platform2tuple(p, platformsSeen) {
  let name = p.platform.slug;
  if (name.includes("pc") || name.includes("mac") || name.includes("linux")) {
    if (platformsSeen.has("pc")) return null;
    platformsSeen.add("pc");
    return { slug: "pc", platform: p.platform.name, icon: mdiMicrosoftWindows };
  } else if (name.includes("xbox")) {
    if (platformsSeen.has("xbox")) return null;
    platformsSeen.add("xbox");
    return { slug: "xbox", platform: p.platform.name, icon: mdiMicrosoftXbox };
  } else if (name.includes("nintendo")) {
    if (platformsSeen.has("nintendo")) return null;
    platformsSeen.add("nintendo");
    return {
      slug: "nintendo",
      platform: p.platform.name,
      icon: mdiNintendoSwitch,
    };
  } else if (name.includes("playstation")) {
    if (platformsSeen.has("playstation")) return null;
    platformsSeen.add("playstation");
    return {
      slug: "playstation",
      platform: p.platform.name,
      icon: mdiSonyPlaystation,
    };
  } else return null;
}

export const DataContext = createContext();
function generateRandom() {
  var random = Math.random() * 20 + 10;
  return random.toFixed(2) + " $";
}
// eslint-disable-next-line react/prop-types
export default function DataProvider({ children }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  function filterKeys(obj) {
    let keys = ["background_image", "id", "name", "platforms", "slug"];
    const res = keys.reduce((acc, key) => {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (key == "platforms") {
          const platformsSeen = new Set();
          acc[key] = obj[key]
            .map((p) => platform2tuple(p, platformsSeen))
            .filter((item) => item !== null);
        } else acc[key] = obj[key];
      }
      return acc;
    }, {});
    res["price"] = generateRandom();
    return res;
  }

  useEffect(() => {
    Promise.all(
      GAMES_LIST.map((game) =>
        fetch(constructUrl(game), { mode: "cors" })
          .then((response) => {
            if (!response.ok) {
              throw new Error("server error");
            }
            return response.json();
          })
          .then((response) => filterKeys(response.results[0]))
      )
    )
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DataContext.Provider value={{ data, error, loading }}>
      {children}
    </DataContext.Provider>
  );
}

const GAMES_LIST = [
  "Call of Duty: Warzone",
  "Call of Duty: Black Ops Cold War",
  "Fortnite",
  "Counter-Strike: Global Offensive",
  "Destiny 2",
  "FIFA 20",
  "Halo",
  "Minecraft",
  "Forza Horizon 5",
  "Need for Speed",
  "Overwatch",
  "Tom Clancy's Rainbow Six Siege",
  "Rocket League",
  "Among Us",
];

export const constructUrl = (game, endPoint = null, query = null) => {
  endPoint = endPoint == null ? "games" : endPoint;
  game = game.replace(/ /g, "%20");
  const games_api = `https://api.rawg.io/api/${endPoint}?key=9d2c342f512543428823f1e2a897f0f1`;
  query = query == null ? `&search=${game}&page=1&search_precise=true` : query;
  return games_api + query;
};

//                                    - - - - - - - - - - -
export const cartItems = createContext();
export const Notif = createContext();
