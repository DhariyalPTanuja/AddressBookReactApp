import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddPersonComponent from './components/AddPersonComponent';
import HeaderComponent from './components/HeaderComponent';
import ListUserComponent from './components/ListUserComponent';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <HeaderComponent/>
     <Routes>
     <Route path='/' exact element = {<ListUserComponent />}/>
     <Route path='/persons' element = {<ListUserComponent />}/>
      {/* <Route path='/add-person' element = {<AddPersonComponent />}/> */}
      <Route path='/add-person/:id' element = {<AddPersonComponent />}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
