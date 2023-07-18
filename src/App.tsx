import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "styles/common";
import Home from "pages/Home";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/exam" element={<Home />} />
        <Route path="*" element={<div>Not Found!</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
