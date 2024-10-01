
import './App.css';
import{BrowserRouter,Route,Routes} from'react-router-dom'
import Store from './Component/Store';
import Cart from './Component/Cart';
import Headder from './Component/Headder';
import Home from './Component/Home';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Headder/>
     <Routes>
      <Route path='/store' element={<Store/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/' element={<Home/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
