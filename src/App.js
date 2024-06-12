import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import "./css/common.css";
import "./css/reset.css";
import TestPage from "./pages/TestPage";
import CheckList from "./pages/ldh/CheckList";
import LogIn from "./pages/ldh/LogIn";

import { UserInfoProvider } from "./context/UserInfoProvider";
import SignupPage from "./pages/gmu/SignupPage";

function App() {
  return (
    <UserInfoProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<TestPage></TestPage>}></Route>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/checklist" element={<CheckList></CheckList>}></Route>
          <Route path="/signup" element={<SignupPage></SignupPage>} />
        </Routes>
      </BrowserRouter>
    </UserInfoProvider>
  );
}

export default App;
