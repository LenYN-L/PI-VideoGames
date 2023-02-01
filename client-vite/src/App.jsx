import { Routes, Route } from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Home from './containers/Home/Home'
import Create from './containers/Create/Create'
import NavBar from './components/NavBar/NavBar'
import GameDetail from './components/GameDetail/GameDetail'
import Search from './containers/Search/Search'
import './App.css'

function App() {

  return (
    <div className='container'>
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/create' element={<Create/>} />
        <Route path='/home/:id' element={<GameDetail/>} />
        <Route path='/results/:name' element={<Search/>} />
      </Routes>
    </div>
  )
}

export default App
