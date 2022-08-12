// noinspection ES6CheckImport

import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Error404 from "./pages/Error404";
import Auth from "./pages/Auth";
import News from "./pages/News";
import Lists from "./pages/Lists";
import Dashboard from "./pages/Dashboard";
import Bots from "./pages/Bots";
import Catalog from "./pages/Catalog";
import Manga from "./pages/Manga";
import Disconnect from "./pages/Disconnect";
import Forget from "./pages/Forget";
import ResetPassWord from "./pages/ResetPassWord";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/catalog" element={<Catalog/>}/>
                <Route path="/bots" element={<Bots/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/disconnect" element={<Disconnect/>}/>
                <Route path="/forget" element={<Forget/>}/>
                <Route path="/manga/*" element={<Manga/>}/>
                <Route path="/list/*" element={<Lists/>}/>
                <Route path="/new/*" element={<News/>}/>
                <Route path="/rpw/*" element={<ResetPassWord/>}/>
                <Route path="*" element={<Error404/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
