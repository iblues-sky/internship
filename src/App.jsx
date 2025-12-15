import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import SignUp from './Auth/signup';
import SignIn from './Auth/signin';
import Home from './pages/home';
import Profile from './pages/Profile';
import OtpVerification from './Auth/OtpVerification';
import PostInternship from './pages/postjobs';
import Application from './pages/application';
import CertificateVerify from './pages/cerificateVerify';
import Footer from './components/Footer';

// Layout for pages with header
const MainLayout = () => (
  <div className='w-full relativ'>
    <Header />
    <Outlet /> {/* Render the nested route here */}
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <div>
        <div className=" ">
          <Routes>
            {/* Routes with header */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            <Route path='/post-job' element={<PostInternship />} />
            <Route path='/application' element={<Application />} />
            <Route path='/certificate-verify' element={<CertificateVerify />} />
            </Route>

            {/* Auth routes without header */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path='/verify-otp' element={<OtpVerification />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
