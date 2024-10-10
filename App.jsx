import './App.css'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Homepage/Home'
import Main from './components/component/Main/Main'
import Footer from './components/Footer/Footer'
import Error from './components/errorpage/Error'
import Calculator from './components/Calculator/Calculator'
import { useEffect, useState } from 'react'
import Todo from './components/todo/Todo'

const int = 'home'
function App() {
  const [toggle,setToggle] = useState('');

  useEffect(()=>{
    setToggle(toggle || int);
  },[]);

  return (
   <div className='App-Container'>
    <h1 className='App-header text-white bg-dark'>CSI205 FRONT-END SOFTWARE DEVELOPMENT</h1>
    <hr />
    <BrowserRouter>
      <Navbar toggle={toggle} setToggle={setToggle}/>
      <hr />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/component' element={<Main/>}/>
        <Route path='/calculator' element={<Calculator/>}/>
        <Route path='/todo' element={<Todo/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
   </div>
  )
}

export default App
