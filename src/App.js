import './App.css';
import Chats from './Chats';
import Sidebar from './Sidebar';
import { BrowserRouter as Router,Routes ,Route} from 'react-router-dom';
import  Login  from "./Login";
import { useStateValue } from './Stateprovider';
import Demo from './Demo';
function App() {
  let [{ user }]=useStateValue();
  return (
    <div className="app">
      {!user ? <Login/>:
       <div className='app_body'>
       <Router>
       <Sidebar/>
         <Routes>
       <Route path='/rooms/:roomId' element={<Chats/>}></Route>
       <Route path='/' element={<Demo/>}></Route>
      </Routes>
      </Router>
     </div>}    
    </div>
  );
}

export default App;
