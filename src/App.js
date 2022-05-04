import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Navigator from './navigator/navigator'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigator />
      </BrowserRouter>
    </div>
  )
}

export default App
