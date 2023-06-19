import { Form } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";


import { UPDATE_USER_RESET } from "../../constants/userConstants";
import { getUserDetails, updateUser, clearErrors, } from "../../actions/userAction";
import { useParams, useHistory } from "react-router-dom";




const BasicElements = () => {

  const dispatch = useDispatch();
  const alert = useAlert();

  const {  error, user } = useSelector((state) => state.userDetails);

  const { updateError, isUpdated, } = useSelector((state) => state.profile);


  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [position, setPosition] = useState("");
  const history = useHistory()
  const { userId } = useParams();


  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {

      setStatus(user.activation_status);
      setRole(user.role);
      setPosition(user.position);

    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
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
  }, [dispatch, alert, error, history, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const UserData = {
      activation_status: status,
      role: role,
      position: position,

    };

    dispatch(updateUser(userId, UserData));

  }

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Form elements Super admin </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Forms</a></li>
            <li className="breadcrumb-item active" aria-current="page">Form elements from Super admin </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-md-6  grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Member Edit Form super Admin</h4>
              <p className="card-description"> Name: <code>{user.firstName}</code>  </p>
              <p className="card-description"> Account Status : <code>{user.activation_status}</code>  </p>

              <Form.Group>
                <label >Position</label>
                <select className="form-control form-control-lg" value={position} onChange={(e) => setPosition(e.target.value)}>
                  <option value="">Choose Position</option>
                  <option value='president'>President</option>
                  <option value='vice_president_activity' >Vice-President(Activity)</option>
                  <option value='vice-president_technical' >Vice-President(Technical)</option>
                  <option value="general_secretary" >General Secretary</option>
                  <option value="treasurer" >Treasurer</option>
                  <option value="organizing_secretary" >Organizing Secretary</option>
                  <option value="it_secretary" >IT Secretary</option>
                  <option value="publicity_secretary" >Publicity Secretary</option>
                  <option value="development_secretary" >Development Secretary</option>
                  <option value="publication_coordinator_lead" >Publication Coordinator Lead</option>
                  <option value="acm_programming_coordinator_lead" >ACM programming Coordinator Lead</option>
                  <option value="workshop_and_seminar_lead" >Workshop And Seminar Lead</option>
                  <option value="multimedia_and_Gaming _coordinator_lead" >Multimedia and Gaming Coordinator Lead</option>
                  <option value="senior_executives" >Senior Executives</option>
                  <option value="assistant_eneral_secretary" >Assistant General Secretary</option>
                  <option value="assistant_organizing_secretary" >Assistant Organizing Secretary</option>
                  <option value="assistant_treasurer" >Assistant Treasurer</option>
                  <option value="assistant_it_secretary" >Assistant IT Secretary</option>
                  <option value="assistant_sevelopment_secretary" >Assistant Development Secretary</option>
                  <option value="publication_coordinator" >Publication Coordinator</option>
                  <option value="acm_programming_coordinator" >ACM  programming Coordinator</option>
                  <option value="workshop_seminar_coordinator" >Workshop & seminar Coordinator</option>
                  <option value="multimedia_and_gaming_coordinotor" >Multimedia and Gaming Coordinotor</option>
                  <option value="official_photographer" >Official Photographer</option>

                </select>
              </Form.Group>
              <Form onSubmit={updateUserSubmitHandler}>
                <Form.Group>
                  <label >User Role</label>
                  <select value={role} onChange={(e) => setRole(e.target.value)} className="form-control form-control-sm" id="exampleFormControlSelect3">
                    <option value="">Choose Role</option>
                    <option value="super-admin">SUPER-ADMIN</option>
                    <option value="admin">ADMIN</option>
                    <option value="user">User</option>
                  </select>
                </Form.Group>

                <Form.Group >
                  <label >Account Status</label>
                  <select value={status}
                    onChange={(e) => setStatus(e.target.value)} className="form-control form-control-sm" id="exampleFormControlSelect3">
                    <option value="">Choose status</option>
                    <option value="active">active</option>
                    <option value="de-active">de-active</option>
                  </select>
                </Form.Group>
                <button type="submit" className="btn btn-primary mb-2">Submit</button>
              </Form>
            </div>
          </div>
        </div>
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Member Information</h4>

              <div>
                <p className="card-description"> Name : <code>{user.firstName}</code>  </p>
                <p className="card-description"> Student Id : <code>{user.student_id}</code>  </p>
                <p className="card-description"> Depertment : <code>{user.depertment}</code>  </p>
                <p className="card-description"> Batch : <code>{user.batch}</code>  </p>
                <p className="card-description"> Section : <code>( {user.section} )</code>  </p>
                <p className="card-description"> Email : <code>{user.email}</code>  </p>
                <p className="card-description"> Phone Number: <code>{user.phone_number}</code>  </p>


                {user.activation_status == "active" ? <button type="submit" className="btn btn-success mb-2">Active</button> :

                  <label className="badge badge-danger">Pending</label>}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Member Picture</h4>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>

                <p className="card-description"> <code><img src={user.pofilePicture} style={{ height: "450px", width: '400px', objectFit: 'cover', borderRadius: '10%', }} /></code>  </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )

}

export default BasicElements
