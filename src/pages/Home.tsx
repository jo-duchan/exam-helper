import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <h1>HomePage</h1>
      <p>
        <Link to="/quiz">START</Link>
      </p>
    </>
  );
}

export default HomePage;
