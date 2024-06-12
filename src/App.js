import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Test from "./components/hwc/Test";
import Header from "./components/layout/Header";
import { UserInfoProvider } from "./context/UserInfoProvider";
import "./css/common.css";
import "./css/reset.css";
import TestPage from "./pages/TestPage";
import SignupPage from "./pages/gmu/SignupPage";
import CheckList from "./pages/ldh/CheckList";
import LogIn from "./pages/ldh/LogIn";
import SignupPage from "./pages/gmu/SignupPage";
import { UserInfoProvider } from "./context/UserInfoProvider";


function App() {
  const [onHeader, setOnHeader] = useState(true);
  return (
    <UserInfoProvider>
      <BrowserRouter>
        <Header onheader={onHeader} />
        <Routes>
          <Route
            path="/login"
            element={<LogIn setOnHeader={setOnHeader} />}
          ></Route>
          <Route path="/" element={<TestPage />}></Route>
          <Route path="/test" element={<Test />}></Route>
          <Route path="/checklist" element={<CheckList></CheckList>}></Route>
          <Route path="/signup" element={<SignupPage></SignupPage>} />
        </Routes>
      </BrowserRouter>
    </UserInfoProvider>
  );
}

export default App;
