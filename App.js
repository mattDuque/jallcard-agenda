import React from 'react'
import Header from './Components/Header'
import ContactsList from './Components/ContactsList'
import Login from './Components/Login'
import { useStateValue } from './StateProvider'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './Styles/App.css'

function App() {

  const [{ user }] = useStateValue()

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
