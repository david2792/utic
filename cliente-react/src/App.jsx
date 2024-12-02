
import './App.css'
import Menu from './componentes/Menu'
import Empresa from './componentes/Empresa'
import { BrowserRouter as Router,Routes, Route } from "react-router";
function App() {
  return(
   <Router>
          <Menu></Menu>
          <div className="conteiner">
            <Routes>
              <Route path='/empresa' element={<Empresa/>} ></Route>
            </Routes>
          </div>
   </Router>
  )
}

export default App
