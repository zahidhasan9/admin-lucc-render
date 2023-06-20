import { Form } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory } from 'react-router-dom';
import { clearErrors, getUserDetails_controller, updateController } from "../../actions/userAction";
import { UPDATE_USER_RESET } from "../../constants/userConstants";



function BasicElements() {
  const { error, user } = useSelector((state) => state.userDetails);
  const { updateError, isUpdated, } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const alert = useAlert();
  const userId = '61ea928519b96b1c144c4bbb';
  const history = useHistory();
  const Cencel = () => {
    history.push('/')
  }

  const [state, setState] = useState({
    countdown: "",
    controller_name: '',
    day1: '',
    day2: '',
    day3: '',
    day4: '',


  });


  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails_controller(userId));
    } else {


      setState({

        controller_name: user.controller_name,
        schedule: user.schedule,
        day1: user.day1,
        day2: user.day2,
        day3: user.day3,
        day4: user.day4,

      })
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Updated Successfully");
      history.push("/tables/basic-table");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, isUpdated, updateError, user, userId]);


  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const UserData = {

      controller_name: state.controller_name,
      schedule: state.schedule,
      day1: state.day1,
      day2: state.day2,
      day3: state.day3,
      day4: state.day4,



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
        <h3 className="page-title">  Update Schedule </h3>
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
              <h4 className="card-title">Update Schedule Link/G-drive</h4>
              <p className="card-description"> Please fill up the schedule file link </p>
              <form onSubmit={updateUserSubmitHandler} className="forms-sample">
                <Form.Group>
                  <label > Provide the link</label>
                  <Form.Control name="schedule" onChange={changeHandler} type="text" className="form-control" value={state.schedule} placeholder="Name" />
                </Form.Group>
                <button type="submit" className="btn btn-primary mr-2">Submit</button>
                <button type='button' onClick={Cencel} className="btn btn-dark">Cancel</button>

              </form>
            </div>
          </div>
        </div>
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Update Schedule Day</h4>
              <p className="card-description"> Please fill up the schedule file link </p>
              <form onSubmit={updateUserSubmitHandler} className="forms-sample">
                <Form.Group>
                  <label > Day 1</label>
                  <Form.Control name="day1" onChange={changeHandler} type="text" className="form-control" value={state.day1} placeholder="Day1" />
                </Form.Group>
                <Form.Group>
                  <label > Day 2</label>
                  <Form.Control name="day2" onChange={changeHandler} type="text" className="form-control" value={state.day2} placeholder="Day2" />
                </Form.Group>
                <Form.Group>
                  <label > Day 3</label>
                  <Form.Control name="day3" onChange={changeHandler} type="text" className="form-control" value={state.day3} placeholder="Day3" />
                </Form.Group>
                <Form.Group>
                  <label > Day 4</label>
                  <Form.Control name="day4" onChange={changeHandler} type="text" className="form-control" value={state.day4} placeholder="Day4" />
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
