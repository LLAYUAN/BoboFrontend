import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Home from "../view/home";
import Popular from "../view/popular";
import Category from "../view/category";
import Vedio from "../view/video";
import LiveUser from "../view/liveUser";
import Profile from "../view/profile";
import LiveAnchor from "../view/liveAnchor";
import Login from "../view/login";
import Nav from "../components/nav";

function Layout() {
    const location = useLocation();
    return (
        <>
            {location.pathname !== '/login' && <Nav />}
            <div style={{ paddingTop: location.pathname !== '/login' ? '80px' : '0' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/popular" element={<Popular />} />
                    <Route path="/category" element={<Category />} />
                    <Route path="/vedio" element={<Vedio />} />
                    <Route path="/liveuser" element={<LiveUser />} />
                    <Route path="/liveanchor" element={<LiveAnchor />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </>
    );
}

export default function AppRouter() {
    return (
        <Router>
            <Layout />
        </Router>
    );
}
