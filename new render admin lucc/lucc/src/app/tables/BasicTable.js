import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getAllcontroller } from "../../actions/userAction";


const BasicTable = ({ history }) => {

  const dispatch = useDispatch();
  const { error, users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }



    dispatch(getAllcontroller());
  }, [dispatch, alert, error, history]);




  // console.log('user', users)
  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Controller Section </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Tables</a></li>
            <li className="breadcrumb-item active" aria-current="page">Controller</li>
          </ol>
        </nav>
      </div>

      <div className="row">
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Controller</h4>
              {/* <p className="card-description"> Add className <code>.table</code>
              </p> */}
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Controller Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users && users.filter(row => row.controller_name != null).map(row => {
                      return (
                        <tr>
                          {/* <th scope="row" key={row.id}>{row.id}</th> */}
                          <td>{row.controller_name}</td>
                          {/* <td>{row.countdown}</td> */}
                          {/* <td>{row.countdown}</td> */}
                          <td><Link className="badge badge-danger" to={`/table/` + row.controller_name}>Edit</Link></td>
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


export default BasicTable
