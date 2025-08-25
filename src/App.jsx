import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react'
import HomeSliderImages from './components/Home/HomeSliderImages';
import HomeSlider from './components/Home/HomeSlider';
import BestArticles from './components/Home/BestArticles';
import SubscribePage from './components/Home/SubscribePage';
import Loginpage from './components/Landing/Loginpage';
import Signup from './components/Landing/Signup';
import Home from "./components/Home/Home"
import ArticlesRootPage from './components/Articles/ArticlesRootPage';
import HomeFArticles from './components/Articles/HomeFArticles';
import HomeRootPage from './components/Home/HomeRootPage';
import Navbar from './Navbar';
import Footer from './Footer';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import ProtectedRoute from './ProtectedRoute';
import AddArticles from './components/Home/AddArticles';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthh') === 'true';
  });
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem('isAuthh') === 'true');
  };
  window.addEventListener('storage', handleStorageChange);
  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
}, []);
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthh', 'true');
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  return (
    <>
      <BrowserRouter>
        <Navbar handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path='/' element={<HomeRootPage />} />
          <Route path='/login' element={<Loginpage handleLogin={handleLogin} />} />
          <Route path='/signup' element={<Signup />} />
          {/*  create more routes for the paths say about us, conact */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/articles" element={<HomeFArticles />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/home" element={<HomeRootPage />} />
            <Route path="/articles/:id" element={<ArticlesRootPage />} />
            <Route path="/addArticles" element={<AddArticles />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App
