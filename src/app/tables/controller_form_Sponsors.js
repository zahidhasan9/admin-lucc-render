import { Form } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory } from 'react-router-dom';
import { clearErrors, getAllcontroller } from "../../actions/userAction";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import axios from "axios";



function BasicElements() {
  const { loading, error, } = useSelector((state) => state.userDetails);
  const { updateError, isUpdated, } = useSelector((state) => state.profile);
  const { users } = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();
  const Cencel = () => {
    history.push('/')
  }

  const [state, setState] = useState({
    sponsor_name: '',
    sponsor_logo: '',

  });



  useEffect(() => {

    dispatch(getAllcontroller());
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (loading) {
      alert.success("Count-Down Updated Successfully");
      history.push("/tables/basic-table");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, isUpdated, updateError]);




  // get value from 
  const updateUserSubmitHandler = async (e) => {
    e.preventDefault();

    const UserData = {

      sponsor_name: state.sponsor_name,
      sponsor_logo: state.sponsor_logo,


    };
    await axios.post('http://localhost:2000/api/add/global', UserData)
    history.push("/tables/basic-table");
    alert.success("Add Sponsor Successfully");

  }



  const DeleteSubmitHandler = async (id) => {

    await axios.delete(`http://localhost:2000/api/delete/${id}`)
    history.push("/tables/basic-table");
    alert.success("Delete Sponsor Successfully");
    console.log("user delete", id)

  }


  const changeHandler = (e) => {
    setState({
      ...state, [e.target.name]: e.target.value
    }
    )
  }


  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">  Update Sponsor </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}> Forms</a></li>
            <li className="breadcrumb-item active" aria-current="page"> Update Sponsor Form </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Add Sponsors Name</h4>
              <p className="card-description"> Please fill up the sponsor form </p>
              <form onSubmit={updateUserSubmitHandler} className="forms-sample">
                <Form.Group>
                  <label > Provide the name</label>
                  <Form.Control name="sponsor_name" onChange={changeHandler} type="text" className="form-control" placeholder="Sponsor Name" />
                </Form.Group>
                <Form.Group>
                  <label > Provide the logo url</label>
                  <Form.Control name="sponsor_logo" onChange={changeHandler} type="text" className="form-control" placeholder="Sponsor Logo url" />
                </Form.Group>
                <button type="submit" className="btn btn-primary mr-2">Add</button>
                <button type='button' onClick={Cencel} className="btn btn-dark">Cancel</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Sponsor Table</h4>
             {/* <p className="card-description"> Add className <code>.table</code> 
              </p> */}
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Sponsors Name</th>
                      <th>Sponsors Logo</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users && users.filter(row => row.controller_name == null).map(row => {
                      return (
                        <tr>
                          {/* <th scope="row" key={row.id}>{row.id}</th> */}
                          <td>{row.sponsor_name}</td>
                          <td><img src={row.sponsor_logo} style={{ objectFit: 'contain' }} /></td>

                          <td><button className="badge badge-danger" onClick={() => DeleteSubmitHandler(row._id)} >Delete</button></td>
                        </tr>
                      )
                    })}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>









  )
}

export default BasicElements
