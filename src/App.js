import './App.less'
import { BrowserRouter } from 'react-router-dom'
import Navigator from './navigator/navigator'
import moment from 'moment'
import 'moment/locale/it'

moment.locale('it')

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
