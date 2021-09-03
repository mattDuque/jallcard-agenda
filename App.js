import './Styles/App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './Components/Header'
import ContactsList from './Components/ContactsList'

function App() {
  return (
    <Router>
      <div className="app">
        <div className="app__header">
          <Header />
        </div>
        <div className="app__body">
          <ContactsList />
        </div>
      </div>
    </Router>
  );
}

export default App;
