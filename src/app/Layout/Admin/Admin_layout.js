import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Sidebar from '../../shared/Sidebar';
import Navbar from '../../shared/Navbar';
import Spinner from '../../shared/Spinner';
import Footer from '../../shared/Footer';
import Myspinner from '../../shared/Myspinner';
import Login1 from "../../user-pages/Lu_login";


// higher order component 
import PrivateRoute from '../../HOC/PrivateRoute';


// component 
const Dashboard = lazy(() => import('../../dashboard/Dashboard'));
const Edit_User = lazy(() => import('../../form-elements/Edit-User'));
const Edit_Profile = lazy(() => import('../../form-elements/ProfileEdit'));
const BasicTable = lazy(() => import('../../tables/BasicTable'));
const MemberTable = lazy(() => import('../../tables/Table2'));
const Error404 = lazy(() => import('../../error-pages/Error404'));
const Login = lazy(() => import('../../user-pages/Login'));
const Register1 = lazy(() => import('../../user-pages/Register'));
const Events_Lucc_form = lazy(() => import('../../Events/event_form/Lucc_form'));
const Events_non_Lucc_form = lazy(() => import('../../Events/event_form/non_lucc_form'));
const Events_table_lucc = lazy(() => import("../../Events/events_table_lucc_member"));
const Events_table_non_lucc = lazy(() => import("../../Events/events_table_non_lucc_member"));
const Controller_form = lazy(() => import("../../tables/controller_form_countdown"));
const Controller_form_schedule = lazy(() => import("../../tables/controller_form_schedule"));
const Controller_form_counter = lazy(() => import("../../tables/controller_form_counter"));
const Controller_form_event_select = lazy(() => import("../../tables/controller_form_event_select"));
const Controller_form_Sponsors = lazy(() => import("../../tables/controller_form_Sponsors"));
const Controller_form_select_program = lazy(() => import("../../tables/controller_form_select_program"));

const AppRoutes = () => {

  const [load, setLoad] = useState(true);


  useEffect(() => {

    setTimeout(() => {
      setLoad(false)
    }, 500)
    // dispatch(isUserLoggedIn())
  }, []);




  return (
    <Suspense fallback={load ? < Myspinner /> : ''}>
     < Router>
       <div className="container-scroller">
          <Sidebar />
          <div className="container-fluid page-body-wrapper">
            <Navbar /><Spinner />
            <div className="main-panel">
              <div className="content-wrapper">
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  <PrivateRoute path="/tables/member-table" component={MemberTable} />
                  <PrivateRoute exact path="/user:userId"> <Edit_User /></PrivateRoute>
                  <PrivateRoute path="/edit-profile" component={Edit_Profile} />
                  <PrivateRoute path="/tables/basic-table" component={BasicTable} />
                  <PrivateRoute path="/user-pages/login-1" component={Login} />
                  <PrivateRoute path="/user-pages/register-1" component={Register1} />
                  <PrivateRoute path="/events/table/lucc" component={Events_table_lucc} />
                  <PrivateRoute path="/events/table/nonlucc" component={Events_table_non_lucc} />
                  <PrivateRoute path="/table/countdown" component={Controller_form} />
                  <PrivateRoute path="/table/schedule" component={Controller_form_schedule} />
                  <PrivateRoute path="/table/counter" component={Controller_form_counter} />
                  <PrivateRoute path="/table/event_select" component={Controller_form_event_select} />
                  <PrivateRoute path="/table/Event_Sponsors" component={Controller_form_Sponsors} />
                  <PrivateRoute path="/table/Select-Program" component={Controller_form_select_program} />
                  <PrivateRoute path="/eventsluccform:euserId" component={Events_Lucc_form} />
                  <PrivateRoute path="/eventsnonluccform:euserId" component={Events_non_Lucc_form} />
                  <Route exact path="/:error404" component={Error404} />
                  <Route exact path='/login'> <Login1 /></Route>
                  <Redirect exact to="/dashboard" />
                </Switch>
              </div>
              < Footer />
            </div>
          </div>
        </div>
      </Router>
    </Suspense>
  );

}

export default AppRoutes;