import { Routes,Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Homepage from './pages/Homepage.jsx';
import Registration from './pages/Registration.jsx';
import Loginpage from './pages/Loginpage.jsx';
import { auth,handleUserProfile } from './firebase/utils.js';
import './default.scss';
import { Component } from 'react';
import { onSnapshot } from "firebase/firestore";

const initialState = {
    currentUser: null
}

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            ...initialState
        };
    }

    authListener = null;

    componentDidMount(){
        this.authListener = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await handleUserProfile(userAuth)
                onSnapshot(userRef,snapshot => {
                    this.setState({
                        currentUser: {
                            id: snapshot.id,
                            ...snapshot.data()
                        }
                    })
                })
            } else {
                this.setState({currentUser: null})
                initialState.currentUser=null
            }
        })
    }

    componentWillUnmount(){
        this.authListener();
    }

    render(){
        const { currentUser } = this.state;

        return  (
            <div >
                <Header currentUser={currentUser}/>
                <div className='main'>
                <Routes>
                    <Route exact path="/" element={<Homepage />} currentUser={currentUser}/>
                    <Route path="/register" element={<Registration />} currentUser={currentUser}/>
                    <Route path="/login" element={<Loginpage />} currentUser={currentUser}/>
                </Routes>
                </div>
            </div>
        )
    }
}

export default App;