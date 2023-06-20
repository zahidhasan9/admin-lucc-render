import { Form } from 'react-bootstrap';
import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { UPDATE_USER_RESET } from "../../../constants/userConstants";
import { updateProfile_event, clearErrors, getUserDetails_event, } from "../../../actions/userAction";
import { useParams, useHistory } from "react-router-dom";


const BasicElements = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory()
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const { updateError, isUpdated, } = useSelector((state) => state.profile);
  const [status, setStatus] = useState("");

  // --------remain un-change data----------
  const [state, setState] = useState({
    firstName: "",
    student_id: '',
    phone_number: '',
    contest_name: "",
    institute_name: "",
    transactionid: "",
    payment_number: "",
    batch:'',
    section:'',
    //   -------member2------
    member2_name: "",
    institute_name2: "",
    T_Shirt_Size2: "",
    phone_number2: "",
    student_id2: "",

    //   -------member3------
    member3_name: "",
    institute_name3: "",
    T_Shirt_Size3: "",
    phone_number3: "",
    student_id3: "",

    //   -------member3------
    member4_name: "",
    institute_name4: "",
    T_Shirt_Size4: "",
    phone_number4: "",
    student_id4: "",


  });



  const { euserId } = useParams();


  useEffect(() => {
    if (user && user._id !== euserId) {
      dispatch(getUserDetails_event(euserId));
    } else {

      setStatus(user.reg_status);

      setState({
        firstName: user.firstName,
        student_id: user.student_id,
        phone_number: user.phone_number,
        contest_name: user.contest_name,
        institute_name: user.institute_name,
        transactionid: user.transactionid,
        T_Shirt_Size: user.T_Shirt_Size,
        payment_number: user.payment_number,
        batch:user.batch,
        section:user.section,

        //   -------member2------
        member2_name: user.member2_name,
        institute_name2: user.institute_name2,
        T_Shirt_Size2: user.T_Shirt_Size2,
        phone_number2: user.phone_number2,
        student_id2: user.student_id2,

        //   -------member3------
        member3_name: user.member3_name,
        institute_name3: user.institute_name3,
        T_Shirt_Size3: user.T_Shirt_Size3,
        phone_number3: user.phone_number3,
        student_id3: user.student_id3,

        //   -------member4------
        member4_name: user.member4_name,
        institute_name4: user.institute_name4,
        T_Shirt_Size4: user.T_Shirt_Size4,
        phone_number4: user.phone_number4,
        student_id4: user.student_id4,


      })
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
      history.push("/events/table/lucc");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, history, isUpdated, updateError, user]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const UserData = {
      reg_status: status,


      firstName: state.firstName,
      student_id: state.student_id,
      phone_number: state.phone_number,
      contest_name: state.contest_name,
      institute_name: state.institute_name,
      transactionid: state.transactionid,
      T_Shirt_Size: state.T_Shirt_Size,
      payment_number: state.payment_number,
      batch:state.batch,
      section:state.section,

      // ----------member2-------
      member2_name: state.member2_name,
      institute_name2: state.institute_name2,
      T_Shirt_Size2: state.T_Shirt_Size2,
      phone_number2: state.phone_number2,
      student_id2: state.student_id2,

      // ----------member3-------
      member3_name: state.member3_name,
      institute_name3: state.institute_name3,
      T_Shirt_Size3: state.T_Shirt_Size3,
      phone_number3: state.phone_number3,
      student_id3: state.student_id3,

      // ----------member2-------
      member4_name: state.member4_name,
      institute_name4: state.institute_name4,
      T_Shirt_Size4: state.T_Shirt_Size4,
      phone_number4: state.phone_number4,
      student_id4: state.student_id4,

    };

    dispatch(updateProfile_event(euserId, UserData));
    // console.log(euserId,UserData,"myform")
    // console.log(status,"status")
  }

  // updateUserSubmitHandler("pending")

  const Accessform = () => {
    return (<div className="col-md-6 grid-margin stretch-card">
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
        {user.role == "admin" ? <Accessform /> :
          user.role == "super-admin" ? <Accessform /> : //importent line

            <div className="col-md-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Event registration</h4>
                  <p className="card-description"> Name: <code>{user.firstName}</code>  </p>
                  {/* <p className="card-description"> Account Status : <code>{user.activation_status}</code>  </p> */}
                  <p className="card-description"> Batch : <code>{user.batch}</code>  </p>
                  <p className="card-description"> Section : <code>{user.section}</code>  </p>
                </div>
              </div>
            </div>

        }


        {/* ---------------------for payment ----------------------------------*/}

        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Payment Section</h4>
              <p className="card-description"> Use the <code>.form-inline</code> className to display a series of labels, form controls, and buttons on a single horizontal row </p>
              {/* <form className="form-inline"> */}
              <form className="form-group" onSubmit={updateUserSubmitHandler}>
                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text text-white " style={{ width: '120px' }}>Contest Name</div>
                  </div>
                  <p className="form-control text-danger"  > {user.contest_name}</p>
                </div>

                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text text-white " style={{ width: '120px' }}>Transaction ID </div>
                  </div>
                  <p className="form-control text-danger"  > {user.transactionid}</p>
                </div>
                <Form.Group >
                  <div className="input-group mb-2 mr-sm-2">
                    {/* <label >Register Status</label> */}
                    <div className="input-group-prepend">
                      <div className="input-group-text text-white " style={{ width: '120px' }}>Register Status</div>
                    </div>
                    <select className="form-control text-danger" value={status}
                      onChange={(e) => setStatus(e.target.value)} >
                      <option >Choose status</option>
                      <option value="un-register">Un-Registerd</option>
                      <option value="registerd">Registerd</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </Form.Group>
                <button type="submit" className="btn btn-primary mb-2">Submit</button>
              </form>
            </div>
          </div>
        </div>


        {/* --------------------------member info 1-----------------------------*/}
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Member Details 1</h4>
              <p className="card-description"> Use the <code>.form-inline</code> className to display a series of labels, form controls, and buttons on a single horizontal row </p>
              {/* <form className="form-inline"> */}
              <form className="form-group">


                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text text-white " style={{ width: '120px' }}> Name </div>
                  </div>
                  <p className="form-control text-danger"  >{user.firstName}</p>
                </div>

                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text text-white " style={{ width: '120px' }}>Email</div>
                  </div>
                  <p className="form-control text-danger"  > {user.email}</p>
                </div>

                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text text-white " style={{ width: '120px' }}>Student ID</div>
                  </div>
                  <p className="form-control text-danger"  >{user.student_id}</p>
                </div>

                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text text-white " style={{ width: '120px' }}>Phone Number</div>
                  </div>
                  <p className="form-control text-danger"  > {user.phone_number}</p>
                </div>

                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text text-white " style={{ width: '120px' }}>T-Shirt Size</div>
                  </div>
                  <p className="form-control text-danger"  >{user.T_Shirt_Size}</p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* --------------------------member info 2-----------------------------*/}
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Member Details 2</h4>
              <p className="card-description"> Use the <code>.form-inline</code> className to display a series of labels, form controls, and buttons on a single horizontal row </p>
              {/* <form className="form-inline"> */}
              <form className="form-group">


                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text text-white " style={{ width: '120px' }}> Name </div>
                  </div>
                  <p className="form-control text-danger"  > {user.member2_name}</p>
                </div>


                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text text-white " style={{ width: '120px' }}>Student ID</div>
                  </div>
                  <p className="form-control text-danger"  >{user.student_id2}</p>
                </div>

                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text text-white " style={{ width: '120px' }}>Phone Number</div>
                  </div>
                  <p className="form-control text-danger"  > {user.phone_number2}</p>
                </div>

                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text text-white " style={{ width: '120px' }}>T-Shirt Size</div>
                  </div>
                  <p className="form-control text-danger"  > {user.T_Shirt_Size2}</p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* --------------------------member info 3-----------------------------*/}
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Member Details 3</h4>
              <p className="card-description"> Use the <code>.form-inline</code> className to display a series of labels, form controls, and buttons on a single horizontal row </p>
              {/* <form className="form-inline"> */}
              <form className="form-group">


                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text text-white " style={{ width: '120px' }}> Name </div>
                  </div>
                  <p className="form-control text-danger"  > {user.member3_name}</p>
                </div>


                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text text-white " style={{ width: '120px' }}>Student ID</div>
                  </div>
                  <p className="form-control text-danger"  >{user.student_id3}</p>
                </div>

                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text text-white " style={{ width: '120px' }}>Phone Number</div>
                  </div>
                  <p className="form-control text-danger"  > {user.phone_number3}</p>
                </div>

                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text text-white " style={{ width: '120px' }}>T-Shirt Size</div>
                  </div>
                  <p className="form-control text-danger"  >{user.T_Shirt_Size3}</p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* --------------------------member info 4-----------------------------*/}
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Member Details 4</h4>
              <p className="card-description"> Use the <code>.form-inline</code> className to display a series of labels, form controls, and buttons on a single horizontal row </p>
              {/* <form className="form-inline"> */}
              <form className="form-group">


                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text text-white " style={{ width: '120px' }}> Name </div>
                  </div>
                  <p className="form-control text-danger"  > {user.member4_name}</p>
                </div>

                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text text-white " style={{ width: '120px' }}>Student ID</div>
                  </div>
                  <p className="form-control text-danger"  >{user.student_id4}</p>
                </div>

                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text text-white " style={{ width: '120px' }}>Phone Number</div>
                  </div>
                  <p className="form-control text-danger"  > {user.phone_number4}</p>
                </div>

                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text text-white " style={{ width: '120px' }}>T-Shirt Size</div>
                  </div>
                  <p className="form-control text-danger"  > {user.T_Shirt_Size4}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  )

}

export default BasicElements
