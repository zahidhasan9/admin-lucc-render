import { Form } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory } from 'react-router-dom';
import { getUserDetails, updateProfile, clearErrors, } from "../../actions/userAction";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
function BasicElements() {
  const { error, user } = useSelector((state) => state.userDetails);
  const { updateError, isUpdated, } = useSelector((state) => state.profile);

  const { userclass } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();
  const userId = userclass._id;
  const history = useHistory();
  const Cencel = () => {
    history.push('/')
  }

  const [state, setState] = useState({
    firstName: "",
    lastName: '',
    depertment: '',
    student_id: '',
    batch: '',
    phone_number: '',
    pofilePicture: '',
    section: '',

  });


  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {


      setState({
        firstName: user.firstName,
        lastName: user.lastName,
        depertment: user.depertment,
        student_id: user.student_id,
        batch: user.batch,
        phone_number: user.phone_number,
        pofilePicture: user.pofilePicture,
        section: user.section
      })
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      history.push("/tables/member-table");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, isUpdated, updateError, user, userId]);


  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const UserData = {
      firstName: state.firstName,
      lastName: state.lastName,
      depertment: state.depertment,
      student_id: state.student_id,
      batch: state.batch,
      phone_number: state.phone_number,
      pofilePicture: state.pofilePicture,
      section: state.section,


    };

    dispatch(updateProfile(userId, UserData));
    console.log("userData", UserData)


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
        <h3 className="page-title"> Update Profile </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}> Forms</a></li>
            <li className="breadcrumb-item active" aria-current="page"> Update Profile Form </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Update profile</h4>
              <p className="card-description"> Please fill up the update form </p>
              <form onSubmit={updateUserSubmitHandler} className="forms-sample">
                <Form.Group>
                  <label >First Name</label>
                  <Form.Control name="firstName" onChange={changeHandler} type="text" className="form-control" value={state.firstName} placeholder="Name" />
                </Form.Group>

                <Form.Group>
                  <label >Last Name</label>
                  <Form.Control name="lastName" onChange={changeHandler} type="text" className="form-control" value={state.lastName} placeholder="Name" />
                </Form.Group>

                <Form.Group>
                  <label >Student ID</label>
                  <Form.Control name="student_id" onChange={changeHandler} type="text" className="form-control" value={state.student_id} placeholder="Student ID" />
                </Form.Group>

                <Form.Group>
                  <label >Depertment</label>
                  <Form.Control name="depertment" onChange={changeHandler} type="text" className="form-control" value={state.depertment} placeholder="Depertment" />
                </Form.Group>

                <Form.Group>
                  <label >Batch</label>
                  <Form.Control name="batch" onChange={changeHandler} type="text" className="form-control" value={state.batch} placeholder="Batch" />
                </Form.Group>

                <Form.Group>
                  <label >Section</label>
                  <Form.Control name="section" onChange={changeHandler} type="text" className="form-control" value={state.section} placeholder="Section" />
                </Form.Group>

                <Form.Group>
                  <label >Phone Number</label>
                  <Form.Control name="phone_number" onChange={changeHandler} type="text" className="form-control" value={state.phone_number} placeholder="Phone Number" />
                </Form.Group>

                <Form.Group>
                  <label >Profile Picture</label>
                  <Form.Control name="pofilePicture" onChange={changeHandler} type="text" className="form-control" value={state.pofilePicture} placeholder="Profile Picture" />
                </Form.Group>

                <Form.Group>
                  <label  >Photo Pre-view</label>
                  <Form> <img src={user.pofilePicture} height='70px' width='70px' style={{ objectFit: 'cover', borderRadius: '50%', marginLeft: '50%' }} /> </Form>
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
