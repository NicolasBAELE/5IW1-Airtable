import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import { Register } from './pages/register';
import { Home } from './pages/home';
import { Login } from "./pages/Login";
import { AuthProvider } from "./components/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Students } from "./pages/Students";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="students" element={<ProtectedRoute element={Students} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
