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
  const history = useHistory()
  const { error, user } = useSelector((state) => state.userDetails);


  const { updateError, isUpdated, } = useSelector((state) => state.profile);


  const [status, setStatus] = useState("");
  const [position, setPosition] = useState("");
  const { userId } = useParams();



  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {

      setStatus(user.activation_status);
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
      position: position,

    };

    dispatch(updateUser(userId, UserData));

  }

  const Accessform = () => {
    return (<div className="col-md-10 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <button className="btn btn-danger mb-2">Access Denied! </button>
          <p className="card-description"> Name: <code>{user.firstName}</code>  </p>
          <p className="card-description"> Account Status : <code>{user.activation_status}</code>  </p>
          <p className="card-description"> Account Role : <code>{user.role}</code>  </p>
          <p className="card-description"> Admin have not access to modify any  <code>ADMIN </code> or <code>SUPER-ADMIN </code>Data </p>
        </div>
      </div>
    </div>)
  }

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Form elements from admin </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Forms</a></li>
            <li className="breadcrumb-item active" aria-current="page">Form elements  admin</li>
          </ol>
        </nav>
      </div>
      <div className="row">
        {user.role=="admin" ? <Accessform /> :
          user.role=="super-admin" ? <Accessform /> : //importent line
            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Member Edit Form for admin</h4>
                  <p className="card-description"> Name: <code>{user.firstName}</code>  </p>
                  <p className="card-description"> Account Status : <code>{user.activation_status}</code>  </p>
                  <Form onSubmit={updateUserSubmitHandler}>
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
                        <option value="publication_coordinator_leage" >Publication Coordinator Leage</option>
                        <option value="acm_programming_coordinator_lead" >ACM programming Coordinator Lead</option>
                        <option value="workshop_and_seminar_lead" >workshop and seminar Lead</option>
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

                    <Form.Group >
                      <label >Account Status</label>
                      <select value={status}
                        onChange={(e) => setStatus(e.target.value)} className="form-control form-control-sm">
                        <option >Choose status</option>
                        <option value="active">active</option>
                        <option value="de-active">de-active</option>
                      </select>
                    </Form.Group>
                    <button type="submit" className="btn btn-primary mb-2">Submit</button>
                  </Form>
                </div>
              </div>
            </div>
        }
      </div>
    </div>

  )

}

export default BasicElements
