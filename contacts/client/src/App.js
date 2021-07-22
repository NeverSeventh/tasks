import { Route, Switch, useHistory } from "react-router";
import Contacts from "./components/Contacts/Contacts";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import {useDispatch, useSelector} from 'react-redux';
import { redirectActionCreator } from "./redux/AC/redirect";
import { useEffect } from "react";
import './app.scss';
import { errorActionCreator } from "./redux/AC/error";
import Signup from "./components/Signup/Signup";
import { fetchLogin, fetchUser } from "./redux/AC/login";
function App() {

  const redirect = useSelector(state => state.redirect)
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user)

  useEffect(()=> {
    if (localStorage.getItem('token') && !user) {
      dispatch(fetchUser());
    }
  },[])

  useEffect(()=> {


    if (redirect) {
      history.push(redirect);
      dispatch(redirectActionCreator(''));
      dispatch(errorActionCreator(''));
    }
  },[redirect])

  return (
    <div className="App">
    <Navbar user={user} />
    <Switch>
      <Route path="/contacts">
        <Contacts/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/signup">
        <Signup/>
      </Route>
    </Switch>
    </div>
  );
}

export default App;
