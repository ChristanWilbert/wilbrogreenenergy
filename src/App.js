import Main from './components/MainComponent';
import { Component } from 'react/cjs/react.production.min';
import './App.css'
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore';

const store = ConfigureStore();

class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <BrowserRouter>
        <div >
          <Main/>
        </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
