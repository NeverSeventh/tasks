import { Route, Switch, useHistory } from "react-router";
import Contacts from "./components/Contacts/Contacts";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import {useDispatch, useSelector} from 'react-redux';
import { redirectActionCreator } from "./redux/AC/redirect";
import { useEffect } from "react";
import './app.scss';
function App() {

  const redirect = useSelector(state => state.redirect)
  const history = useHistory();
  const dispatch = useDispatch();



  useEffect(()=> {
    if (redirect) {
      history.push(redirect);
      dispatch(redirectActionCreator(''));
    }
  },[redirect])

  return (
    <div className="App">
    <Navbar/>
    <Switch>
      <Route path="/contacts">
        <Contacts/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
    </Switch>
    </div>
  );
}

export default App;
