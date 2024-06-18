import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ScheduleTest from "./pages/hwc/ScheduleTest";
import Header from "./components/layout/Header";
import { UserInfoProvider } from "./context/UserInfoProvider";
import "./css/common.css";
import "./css/reset.css";
import TestPage from "./pages/TestPage";
import SignupPage from "./pages/gmu/SignupPage";
import CheckList from "./pages/ldh/CheckList";
import LogIn from "./pages/ldh/LogIn";
import Calendars from "./components/gmu/Calendars";
import CalendarsForAllPlan from "./components/gmu/CalendarsForAllPlan";
import PlanPage from "./pages/gmu/PlanPage";
import PlanModifyPage from "./pages/gmu/PlanModifyPage";
import MyPage from "./components/gmu/MyPage";
import EditProfile from "./components/gmu/EditProfile";

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
          <Route path="/testpage" element={<TestPage />}></Route>
          <Route path="/checklist" element={<CheckList></CheckList>}></Route>
          <Route path="/signup" element={<SignupPage></SignupPage>} />
          <Route path="/detail" element={<ScheduleTest></ScheduleTest>}></Route>
          <Route
            path="/detail/:tourScheduleId"
            element={<ScheduleTest></ScheduleTest>}
          ></Route>

          {/* GMU경로 */}
          <Route path="/plan/:id" element={<Calendars></Calendars>} />
          <Route
            path="/allSchedule"
            element={<CalendarsForAllPlan></CalendarsForAllPlan>}
          />
          <Route path="/plan" element={<PlanPage></PlanPage>} />
          <Route path="/signup" element={<SignupPage></SignupPage>} />
          <Route
            path="/planModify/:id"
            element={<PlanModifyPage></PlanModifyPage>}
          />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/editmypage" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
    </UserInfoProvider>
  );
}

export default App;
