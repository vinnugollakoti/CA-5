import Books from "./Components/Books"
import Register from "./Components/Register"
import './App.css'
import {Routes, Route} from "react-router-dom"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
