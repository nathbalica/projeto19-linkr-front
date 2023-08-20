import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timeline from "./pages/TimelinePage/Timeline";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UserProfile from "./pages/UserPage/User";
import { AuthContextProvider } from "./contexts/AuthContext";

export default function App() {
    return (
        <AuthContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/sign-up" element={<SignUpPage />} />
                    <Route path="/timeline" element={<Timeline />} />
                    <Route path="/user/:user_id" element={<UserProfile />} />
                </Routes>
            </BrowserRouter>
        </AuthContextProvider>
    );
}
