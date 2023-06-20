
import React, { useEffect } from 'react';
import { Link, } from 'react-router-dom';
import MaterialTable from 'material-table'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, clearErrors } from "../../../src/actions/userAction";
function A({ history }) {

  const dispatch = useDispatch();
  const { error, users } = useSelector((state) => state.allUsers);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }


    dispatch(getAllUsers());

  }, [dispatch, alert, error, history]);


  const rows = [];

  users &&
    users.forEach((item) => {
      if (item.role == 'user') {
        rows.push({
          id: item._id,
          fname: item.firstName + " " + item.lastName,
          email: item.email,
          role: item.role,
          status: item.reg_status,
          uid: item.username,
          pofilePicture: item.pofilePicture
        });
      } else { return null }
    });

  const columns = [
    { title: "Name", field: "fname" },
    { title: "User-ID", field: "uid" },
    { title: "Email", field: "email" },
    {
      title: "Email", render: (rowData) => {
        return (
          <>
            <img style={{ objectFit: 'cover', height: '100px', width: "100px", borderRadius: '10px' }} src={rowData.pofilePicture} />
          </>)
      }
    },

    {
      title: "Reg-Status", field: 'status',
      render: (rowData) => {
        return (
          <>
            {rowData.status == 'registerd' ?
              <div className="badge badge-outline-success">Registerd</div>
              : <div className="badge badge-outline-danger">Un-Registerd</div>
            }

          </>
        )
      },
    },

    {
      title: "Action", field: 'username',
      render: (rowData) => {
        return (
          <>
            <Link to={"/eventsluccform" + rowData.id}>
              {/* <button style={{background:'pink'}}><ModeEditIcon style={{background:'blue',color:'red'}}/>Edit</button> */}
              <button className="btn btn-primary btn-fw">Edit</button>
            </Link>
            {/* <DeleteOutline
            className="userListDelete"
            onClick={() => handleDelete(params.row.id)}
          /> */}
          </>
        );
      },
    }
  ]



  const theme = createMuiTheme({
    palette: {
      type: 'dark',

      primary: {
        main: '#4cd8ac',
      },
      secondary: {
        main: '#ff9100',
      },

    },



  })

  return (
    <div className="App">
      <h1 align="center">LUCC Event Member List</h1>
      <MuiThemeProvider theme={theme}>
        <MaterialTable style={{ color: 'snow', padding: "30px", fontFamily: 'sans-serif', borderRadius: '20px' }}
          title="LUCC Event Member List"
          data={rows}
          columns={columns}
          options={{
            filtering: true,
            paging: true,
            tableLayout: "auto"
          }}
        />
      </MuiThemeProvider>
    </div>
  );
}

export default A;