import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Home from "../view/home";
import Popular from "../view/popular";
import Category from "../view/category";
import Video from "../view/video";
import LiveUser from "../view/liveUser";
import Profile from "../view/profile";
import LiveAnchor from "../view/liveAnchor";
import Login from "../view/login";
import Search from "../view/search";
import VisitProfile from "../view/visitProfile";
import Nav from "../components/nav";
import Register from "../view/register";
import ModifyPassword from "../view/modifyPassword";

function Layout() {
    const location = useLocation();
    return (
        <>
            {location.pathname !== '/login' && location.pathname !== "/register" && <Nav />}
            <div style={{ paddingTop: location.pathname !== '/login' && location.pathname !== '/register' ? '80px' : '0' }}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/popular" element={<Popular />} />
                    <Route path="/category" element={<Category />} />
                    <Route path="/video/:videoID" element={<Video />} />
                    <Route path="/liveUser/:roomID" element={<LiveUser />} />
                    {/*<Route path="/liveAnchor/:roomID" element={<LiveAnchor />} />*/}
                    <Route path="/zhubo/:roomID" element={<LiveAnchor />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/visitprofile/:userID" element={<VisitProfile />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="modifypassword" element={<ModifyPassword />} />
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
