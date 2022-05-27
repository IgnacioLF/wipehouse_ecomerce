import { Routes,Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Homepage from './pages/Homepage.jsx';
import Registration from './pages/Registration.jsx';
import Loginpage from './pages/Loginpage.jsx';
import './default.scss';

const App = () => {
 return  (
     <div >
        <Header />
        <div className='main'>
            <Routes>
                <Route exact path="/" element={<Homepage />}/>
                <Route path="/register" element={<Registration />}/>
                <Route path="/login" element={<Loginpage />}/>
            </Routes>
        </div>
     </div>
 )
}

export default App;