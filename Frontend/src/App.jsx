import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EnterPage from "./Pages/EnterPage";
import ChooseHostel from "./Pages/ChooseHostel";
import Chat from "./Pages/Chat";
import NotFound from "./Pages/NotFound";
import MyLogo from "./assets/anonymous.png"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EnterPage/>} />
        <Route path="/choose-hostel" element={<ChooseHostel/>} />
        <Route path="/chat" element={<Chat/>} />
        {/* 404 Page */}
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
