import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import ShowReels from "../components/ShowReels";
import ShowReelForm from "../components/ShowReelForm";

export default (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reels" element={<ShowReels />} />
            <Route path="/new_reel" element={<ShowReelForm />} />
        </Routes>
    </Router>
);