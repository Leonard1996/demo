import React from 'react'
// import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
// import reportWebVitals from './reportWebVitals'
import axios from 'axios'
import { getToken } from './shared/utils'

axios.defaults.baseURL = 'http://ec2-34-244-164-93.eu-west-1.compute.amazonaws.com:4500'
axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`
axios.defaults.headers.post['Content-Type'] = 'application/json'
//
import { createRoot } from 'react-dom/client'
// const container = document.getElementById('root')
// const root = createRoot(container) // createRoot(container!) if you use TypeScript
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
//

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
//
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root'),
// )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
