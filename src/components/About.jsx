import time from "../assets/24_7.png";
import env from "../assets/env.png";
import halal from "../assets/halal.png";
import members from "../assets/members.png";
import "../styles/About.css";
export default function About() {
  return (
    <>
      <section id="about">
        <h2>About Us</h2>
        <p>
          Assalamu Alaykum Wa Rahmatullah Wa Barakatuhu In the name of Allah,
          the Most Gracious, the Most Merciful.
        </p>
        <p>
          Hey there, welcome to Muslim Gamers League! We&apos;re a large, Muslim
          Friendly community that is open to those who wish to game and meet new
          Muslim gamers in the process. We organize regular community events and
          have a dedicated staff of talented gamers to assist around the clock.
          Whether you&apos;re trying to find out how to hop in a match, or just
          understand the basics of a game, we&apos;ve got someone who can help.
        </p>
        <div className="pros">
          <div className="card">
            <img src={members} alt="5000+ Muslim Brothers" />
            <p>Play with over 5000+ Muslim Brothers and Sisters!</p>
          </div>
          <div className="card">
            <img src={halal} alt="Halal Environment" />
            <p>Highly Moderated and Halal Environment</p>
          </div>
          <div className="card">
            <img src={time} alt="Find a team mate 24/7" />
            <p>Find a team mate 24/7 for hundreds of Games</p>
          </div>
          <div className="card">
            <img src={env} alt="Immersive Environment" />
            <p>
              We offer a variety of chats like: Tech, Cars, Islam, Setups, and
              More!
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
