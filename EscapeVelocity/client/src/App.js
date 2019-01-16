import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Legs from './components/Legs';
import { library } from '@fortawesome/fontawesome-svg-core'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Provider } from 'react-redux'
import store from './store'
import BacktestReport from './components/BacktestReport';
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import ProspectiveOptions from './components/ProspectiveOptions';
import sample from './components/sample';
import Payoff from './components/Payoff';
import Equities from './components/Equities';
import CompEquities from './components/CompEquities';
import Mutual from './components/Mutual'



library.add(faTrash)
//import axios from 'axios'




class App extends Component {

  render() {
    return (
      <Provider store={store}>

        <Router>
          <div className="App">
            <div>
              <Navbar />
              <Route exact path="/" component={Legs} />
              <Route exact path="/backtestReport" component={BacktestReport} />
              <Route exact path="/oc" component={ProspectiveOptions} />
              <Route exact path="/ocs" component={sample} />
              <Route exact path="/pf" component={Payoff} />
              <Route exact path="/equities" component={Equities} />
              <Route exact path="/ce" component={CompEquities} />
              <Route exact path="/mutual" component={Mutual} />

              <Footer />

            </div>

          </div>
        </Router>

      </Provider>
    );
  }
}

export default App;
