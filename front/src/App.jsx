import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { GlobalProvider } from "./contexts/GlobalContext";
import { Categories } from "./pages/Categories";
import { Comments } from "./pages/Comments";
import { Layout } from "./pages/Layout";
import { Projects } from "./pages/Projects";
import { Register } from "./pages/register";
import { Students } from "./pages/Students";
import { Technologies } from "./pages/Technologies";
import LoadingBar from "./components/LoadingBar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

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

export default App;
