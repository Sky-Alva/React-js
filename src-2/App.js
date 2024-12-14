import React from 'react';
import { Routes , Route } from 'react-router-dom';
import TaskList from './pages/TaskList';
import Signup from './pages/SignUp';
import Counting from './pages/counting';
import Login from './pages/Login'
import Upload from './pages/Upload'
import Gallery from './pages/gallery';
import MainPage from './pages/mainpage'
function App() {
  return(
    <Routes>
      <Route path='/tasks'    element = {<TaskList/>} />
      <Route path='/counting' element={<Counting/>} />
      <Route path='/signup'   element={<Signup/>}/>
      <Route path='/'         element ={<MainPage/>}/>   
      <Route path='/login'    element = {<Login/>}/>
      <Route path ='/upload'   element = {<Upload/>}/>
      <Route path = '/gallery'element = {<Gallery/>}/>
    </Routes>

  );
}

export default App;
