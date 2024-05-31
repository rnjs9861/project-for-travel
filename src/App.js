import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestPage from "./pages/TestPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestPage></TestPage>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
