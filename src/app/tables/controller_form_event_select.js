import { Form } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory } from 'react-router-dom';
import { clearErrors, getUserDetails_controller, updateController, } from "../../actions/userAction";
import { UPDATE_USER_RESET } from "../../constants/userConstants";

function BasicElements() {
  const { error, user } = useSelector((state) => state.userDetails);
  const {updateError,isUpdated,} = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const alert = useAlert();
  const userId = '61f52ca054963c095446e5b3';
  const history = useHistory();
  const Cencel = () => {
    history.push('/')
  }

  const [state, setState] = useState({
    select_event_name: "",
    controller_name: '',

  });

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails_controller(userId));
    } else {


      setState({
        select_event_name: user.select_event_name,
        controller_name: user.controller_name,

      })
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Event Updated Successfully");
      history.push("/tables/basic-table");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, isUpdated, updateError, user, userId]);


  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const UserData = {
      select_event_name: state.select_event_name,
      controller_name: state.controller_name,

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
        <h3 className="page-title">  Select Event  </h3>
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
              <h4 className="card-title">Update Event</h4>
              <p className="card-description"> Please Select Event  </p>
              <form onSubmit={updateUserSubmitHandler} className="forms-sample">
                <Form.Group>
                  <label > Select Event </label>
                  {/* <Form.Control name="countdown" onChange={ changeHandler}  type="text" className="form-control" value={state.countdown} placeholder="Name" /> */}

                  <select style={{ color: 'snow' }} className='form-control' name="select_event_name" onChange={changeHandler} value={state.select_event_name}>
                    <option value="ict_fest">ICT FEST</option>
                    <option value="lucc_carnival">LUCC CARNIVAL</option>
                    <option value="tech_storm">TECHSTORM</option>
                  </select>
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
