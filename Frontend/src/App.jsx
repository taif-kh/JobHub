import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import First from './First';
import Signup from './Signup';
import Login from './Login';
import HRHome from './HRHome';
import AppDetails from './AppDetails';


const App = () => {
  return (
     <>
        <Routes>
           <Route path="/" element={<First />} />
           <Route path="/signup" element={<Signup />} />
           <Route path="/login" element={<Login />} />
           <Route path="/candidate" element={<Home />} />
           <Route path="/hr" element={<HRHome />} />
           <Route path="/:appId" element={<AppDetails />} />
        </Routes>
     </>
  );
};

export default App;