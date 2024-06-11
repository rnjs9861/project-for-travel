import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./css/reset.css";
import "./css/common.css";
import TestPage from "./pages/TestPage";
import CheckList from "./pages/ldh/CheckList";
import SignupPage from "./pages/gmu/SignupPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestPage></TestPage>}></Route>
        <Route path="/checklist" element={<CheckList></CheckList>}></Route>
        <Route path="/signup" element={<SignupPage></SignupPage>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
