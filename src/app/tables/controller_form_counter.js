import { Form } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory } from 'react-router-dom';
import { clearErrors, getUserDetails_controller, updateController, } from "../../actions/userAction";
import { UPDATE_USER_RESET } from "../../constants/userConstants";



function BasicElements() {
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const { userclass } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();
  const userId = '61dc26e7f878ca44c022060e';
  const history = useHistory();
  const Cencel = () => {
    history.push('/')
  }

  const [state, setState] = useState({
    counter1: "",
    counter2: "",
    counter3: "",
    counter4: "",
    controller_name: '',


  });

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails_controller(userId));
    } else {


      setState({
        controller_name: user.controller_name,
        counter1: user.counter1,
        counter2: user.counter2,
        counter3: user.counter3,
        counter4: user.counter4,
      })
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Counter Updated Successfully");
      history.push("/tables/basic-table");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, isUpdated, updateError, user, userId]);


  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const UserData = {
      controller_name: state.controller_name,
      counter1: state.counter1,
      counter2: state.counter2,
      counter3: state.counter3,
      counter4: state.counter4,


    };

    dispatch(updateController(userId, UserData));

  }

  //  form state change

  const changeHandler = (e) => {
    setState({
      ...state, [e.target.name]: e.target.value
    }
    )
  }


  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Update Event Count-down </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}> Forms</a></li>
            <li className="breadcrumb-item active" aria-current="page"> Update Controller Form </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Update Count-down</h4>
              <p className="card-description"> Please fill up the update form :  </p>
              <form onSubmit={updateUserSubmitHandler} className="forms-sample">
                <Form.Group>
                  <label > Counter Data 1</label>
                  <Form.Control name="counter1" onChange={changeHandler} type="text" className="form-control" value={state.counter1} placeholder="Counter Data" />
                </Form.Group>
                <Form.Group>
                  <label > Counter Data 2</label>
                  <Form.Control name="counter2" onChange={changeHandler} type="text" className="form-control" value={state.counter2} placeholder="Counter Data" />
                </Form.Group>
                <Form.Group>
                  <label > Counter Data 3</label>
                  <Form.Control name="counter3" onChange={changeHandler} type="text" className="form-control" value={state.counter3} placeholder="Counter Data" />
                </Form.Group>
                <Form.Group>
                  <label > Counter Data 4</label>
                  <Form.Control name="counter4" onChange={changeHandler} type="text" className="form-control" value={state.counter4} placeholder="Counter Data" />
                </Form.Group>
                <button type="submit" className="btn btn-primary mr-2">Submit</button>
                <button type='button' onClick={Cencel} className="btn btn-dark">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>




  )
}

export default BasicElements
