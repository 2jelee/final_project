import React from "react";
import "./App.css";
import { Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRoute";
import Main from "./pages/Main";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import LeaveReq from "./components/LeaveReq/LeaveReq";
import Layout from "./components/common/Layout";
import EmpList from "./components/admin/EmpList";
import {useSelector} from "react-redux";
import AdminPage from "./pages/AdminPage";
import LeaveList from "./components/List/LeaveList";
import AttendanceList from "./components/List/AttendanceList";
import {AttendanceReq} from "./components/AttendanceReq/AttendanceReq";
import DeptVacation from "./components/DeptVacation/DeptVacation";

function App() {
    const empRole = useSelector( (state) => state.EMP_INFO.empInfo[2] );
    let LoginChk = localStorage.getItem("LoginChk");

    return (
        <>
            <Routes>
                <Route path="/login" element={ LoginChk === null ? <Login /> : <Navigate replace to="/main" /> } />
                <Route element={ <> <Layout /> <PrivateRoute /> </>}>
                    <Route path="/main" element={<Main />} />
                    <Route path="/profile" element={ empRole !== "ROLE_ADMIN" ? <Profile /> : <AdminPage />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/leavereq" element={<LeaveReq />} />
                    <Route path="/leavelist" element={<LeaveList />} />
                    <Route path="/attendancereq" element={<AttendanceReq />} />
                    <Route path="/attendancelist" element={<AttendanceList />} />
                    <Route path="/admin/list" element={<EmpList/>}/>
                    <Route path="/dvacation" element={<DeptVacation />}/>
                </Route>

                {/* 404 page */}
                <Route
                    path="*"
                    element={
                        <div>
                            {" "}
                            없는 페이지 <Login />{" "}
                        </div>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
