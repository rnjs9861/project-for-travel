import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./css/reset.css";
import "./css/common.css";
import TestPage from "./pages/TestPage";
import CheckList from "./pages/ldh/CheckList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestPage></TestPage>}></Route>
        <Route path="/checklist" element={<CheckList></CheckList>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
