import "./App.css";
import { useRecoilState } from "recoil";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Admin from "./components/Admin/index";
import Login from "./components/login/index";
import { useEffect } from "react";
import { key } from "../src/components/Store/recoil";
function App() {
  const [keyValue, setKeyValue] = useRecoilState(key);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin"
          element={
            keyValue.length !== 0 ? (
              <Admin></Admin>
            ) : (
              <Navigate to="/dangnhap" />
            )
          }
        />
        <Route
          path="/dangnhap"
          element={
            keyValue.length !== 0 ? <Navigate to="/admin" /> : <Login></Login>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
