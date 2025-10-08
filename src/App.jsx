import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import Header from './Header';
import SignUp from './auth/signup';
import SignIn from './auth/signin';
import Home from './auth/home';
import Internship from './Internship';
import Profile from './Profile';

// Layout for pages with header
const MainLayout = () => (
  <div className='w-[100vw]'>
    <Header />
    <Outlet /> {/* Render the nested route here */}
  </div>
);

function App() {
  return (
    <Router>
      <div className='flex justify-center items-center'>
        <div className="container mx-auto ">
          <Routes>
            {/* Routes with header */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/internship" element={<Internship />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Auth routes without header */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
