import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "styles/common";
import Home from "pages/Home";

function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <Home />
      {/* <Routes>
        <Route path="/exam" element={<Home />} />
        <Route path="*" element={<div>Not Found!</div>} />
      </Routes> */}
    </Fragment>
  );
}

export default App;
