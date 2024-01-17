import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div>
      <h1 style={{ color: "var(--grey)" }}>
        Oh no, this route doesn&apos;t exist!
      </h1>
      <Link to="/" style={{ color: "var(--main)" }}>
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
}
