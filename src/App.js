import React from 'react'
import { useStateValue } from './StateProvider'
import { initialState } from './reducer'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './Components/Header'
import ContactsList from './Components/ContactsList'
import Contact from './Components/Contact'
import ContactCreate from './Components/ContactCreate'
import Login from './Components/Login'
import axios from './axios'
import AlertUser from './Components/AlertUser'
import './Styles/App.css'

function App() {

  const [{ user }] = useStateValue(initialState)
  const [userData, setUserData] = React.useState()
  const [trigger, setTrigger] = React.useState(false)
  const [severity, setSeverity] = React.useState("");
  const [alertKey, setAlertKey] = React.useState(0);
  const [alertData, setAlertData] = React.useState(false)

  React.useEffect(() => {
    if (user) {
      axios.post('/contacts/login', {
        data: user.email,
        token: user.accessToken
      })
        .then((res) => setUserData(res.data))
    }
  }, [user])

  React.useEffect(() => {
    if (user) {
      axios.get('/contacts/sync', {
        headers: {
          data: user.email,
          token: user.accessToken
        }
      })
        .then((res) => {
          ifError(res.status)
          setAlertData(res)
          setAlertKey(alertKey + 1)
          setUserData(res.data)
        })
    }
  }, [trigger, user])

  const ifError = (requestCode) => {
    if (requestCode >= 200 && requestCode <= 299) {
      return setSeverity("success")
    } else if (requestCode >= 400 && requestCode <= 599) {
      return setSeverity("error")
    }
  }

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <div className="app__header">
              <Header />
            </div>
            <div className="app__body">
              <Switch>
                <Route path="/contact/:contactId"><Contact data={userData} onChange={() => setTrigger(!trigger)} /></Route>
                <Route path="/create"><ContactCreate onChange={() => setTrigger(!trigger)} /></Route>
                <Route path="/"><ContactsList data={userData} onChange={() => setTrigger(!trigger)} /></Route>
              </Switch>
            </div>
            <AlertUser data={alertData} severity={severity} key={alertKey} />
          </>
        )}
      </Router>
    </div>
  );
}

export default App;