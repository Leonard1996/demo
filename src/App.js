import './App.less'
import { BrowserRouter } from 'react-router-dom'
import Navigator from './navigator/navigator'
import moment from 'moment'
import 'moment/locale/it'
import { createBrowserHistory } from 'history'

const replaceHashPath = () => {
  const history = createBrowserHistory()
  const hash = history.location.hash
  if (hash) {
    const path = hash.replace(/^#/, '')
    if (path) {
      history.replace(path)
    }
  }
}
replaceHashPath()

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
