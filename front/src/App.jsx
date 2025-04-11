import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import { Register } from './pages/register';
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Students } from "./pages/Students";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./contexts/AuthContext";
import { GlobalProvider } from "./contexts/GlobalContext";
import LoadingBar from "./components/LoadingBar";
import { Projects } from "./pages/Projects";
import { Categories } from "./pages/Categories";
import { Technologies } from "./pages/Technologies";
import { Comments } from "./pages/Comments";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <LoadingBar />
          <Routes>
            <Route path="/">
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="students" element={<ProtectedRoute element={Students} />} />
              <Route path="projects" element={<ProtectedRoute element={Projects} />} />
              <Route path="categories" element={<ProtectedRoute element={Categories} />} />
              <Route path="technologies" element={<ProtectedRoute element={Technologies} />} />
              <Route path="comments" element={<ProtectedRoute element={Comments} />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
