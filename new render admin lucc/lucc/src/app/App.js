import React, { useEffect } from 'react';
import { useSelector, useDispatch, } from "react-redux";
import './App.scss';




// ---Import component---
import Login1 from "./user-pages/Lu_login";
import Admin from './Layout/Admin/Admin_layout'
import { loadUser } from '../actions/userAction';



const App = () => {

  const { isAuthenticated } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  useEffect(() => {

    if (!isAuthenticated) {
      dispatch(loadUser());
    }

  }, [isAuthenticated]);
  return (
    <div >
      {isAuthenticated ? <Admin /> : <Login1 />}
    </div>
  );

}

export default App;
