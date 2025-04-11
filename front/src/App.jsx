import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css'
import { Register } from './pages/register';
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { GlobalProvider } from "./contexts/GlobalContext";
import { Categories } from "./pages/Categories";
import { Comments } from "./pages/Comments";
import { Home } from "./pages/home";
import { Login } from "./pages/Login";
import { Projects } from "./pages/Projects";
import { Register } from "./pages/register";
import { Students } from "./pages/Students";
import { Technologies } from "./pages/Technologies";
import { Layout } from "./pages/Layout";

function App() {
    return (
        <GlobalProvider>
            <BrowserRouter>
                <AuthProvider>
                    <Layout>
                        <LoadingBar />
                        <Routes>
                            <Route path="/">
                                <Route
                                    index
                                    element={<Home />}
                                />
                                <Route
                                    path="register"
                                    element={<Register />}
                                />
                                <Route
                                    path="login"
                                    element={<Login />}
                                />
                                <Route
                                    path="students"
                                    element={<ProtectedRoute element={Students} />}
                                />
                                <Route
                                    path="projects"
                                    element={<ProtectedRoute element={Projects} />}
                                />
                                <Route
                                    path="categories"
                                    element={<ProtectedRoute element={Categories} />}
                                />
                                <Route
                                    path="technologies"
                                    element={<ProtectedRoute element={Technologies} />}
                                />
                                <Route
                                    path="comments"
                                    element={<ProtectedRoute element={Comments} />}
                                />
                            </Route>
                        </Routes>
                    </Layout>
                </AuthProvider>
            </BrowserRouter>
        </GlobalProvider>
    );
}

export const foo = 12;

export default App;
