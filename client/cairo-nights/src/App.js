import TopBar from "../src/Components/TobBar/TopBar"
import Home from "../src/Pages/Home/Home"
import Single from "../src/Pages/Single/Single"
import Write from "../src/Pages/Write/Write"
import Login from "./Pages/Login/Login";
import Settings from "./Pages/Settings/Settings";
import Register from "./Pages/Register/Register";
import {Context} from "../src/Context/Context";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {useContext} from "react"

function App() {

  const {user} = useContext(Context);

  return (
    <Router>
        <TopBar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/register' element={user ? <Home /> : <Register/>}/>
          <Route path='/login' element={user ? <Home /> : <Login/>}/>
          <Route path='/write' element={user ? <Write /> : <Login/>}/>
          <Route path='/settings' element={user ? <Settings /> : <Login/>}/>
          <Route path='/post/:postId' element={<Single/>}/>
        </Routes>
    </Router>
  );
}

export default App;
