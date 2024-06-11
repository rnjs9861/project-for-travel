import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./css/reset.css";
import "./css/common.css";
import TestPage from "./pages/TestPage";
import CheckList from "./pages/ldh/CheckList";
import LogIn from "./pages/ldh/LogIn";
import Header from "./components/layout/Header";

import SignupPage from "./pages/gmu/SignupPage";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<TestPage></TestPage>}></Route>
        <Route path="/checklist" element={<CheckList></CheckList>}></Route>
        <Route path="/login" element={<LogIn></LogIn>}></Route>
        <Route path="/signup" element={<SignupPage></SignupPage>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
