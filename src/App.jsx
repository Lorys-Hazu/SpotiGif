import { useEffect, useState, useRef } from 'react'
import Login from './components/Login'
import Home from './components/Home'
import './App.css'

function App() {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const checkToken = () => {
    const exp = new Date(window.localStorage.getItem("expireAt"))
    if (exp.getTime() < Date.now()) {
      window.localStorage.removeItem("token")
      window.localStorage.removeItem("expireAt")
      setToken(null)
    }
  }
  
  let interval = useRef(null);
  useEffect(() => {
     interval.current = setInterval(checkToken, 1000);
     return () => clearInterval(interval.current);
  }, [])
  return (
    <div className="App">
      {token ? <Home /> : <Login setToken={setToken}/>}
      <p className='footer'>Crée par <a target='_blank' href='https://twitter.com/nenuphrap'>@nenuphrap</a></p>
    </div>
  )
}

export default App
