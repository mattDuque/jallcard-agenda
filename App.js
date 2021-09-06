import React from 'react'
import Header from './Components/Header'
import ContactsList from './Components/ContactsList'
import Contact from './Components/Contact'
import ContactCreate from './Components/ContactCreate'
import Login from './Components/Login'
import { useStateValue } from './StateProvider'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './Styles/App.css'

function App() {

  const [{ user }] = useStateValue()
  const handleChange = () => console.log(user.email)

  return (
    <div className="app">
      <Router>
        {user ? (
          <Login />
        ) : (
          <>
            <div className="app__header">
              <Header />
            </div>
            <div className="app__body">
              <Switch>
                <Route path="/contact"><Contact /></Route>
                <Route path="/create"><ContactCreate /></Route>
                <Route path="/"><ContactsList /></Route>
              </Switch>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
/*/:contactId*/