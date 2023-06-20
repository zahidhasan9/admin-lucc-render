
import React, {  useEffect } from 'react';
import { Link, } from 'react-router-dom';
import MaterialTable from 'material-table'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'

import { useDispatch, useSelector } from "react-redux";
import { getAllUsers_event, clearErrors, deleteUser } from "../../../src/actions/userAction";
function A({ history, props }) {

  const dispatch = useDispatch();
  const { error, users } = useSelector((state) => state.allUsers);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }



    dispatch(getAllUsers_event());

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
          contest_name:item.contest_name
        });
      } else { return null }
    });
  // render:rowData=><Link href={`api=${rowData.email}`} target="_blank">{rowData.id}</Link> 
  const columns = [
    // { title: "ID", field: "id", },
    { title: "Name", field: "fname" },
    { title: "User-ID", field: "uid" },
    { title: "Email", field: "email" },
    { title: "Contest name", field: "contest_name" },

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
            <Link to={"/eventsnonluccform" + rowData.id}>
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
      <h1 align="center">Non LUCC Event Member List</h1>
      {/* <h4 align='center'>Hide or Disable action buttons conditionally in Material Table</h4> */}
      <MuiThemeProvider theme={theme}>
        <MaterialTable style={{ color: 'snow', padding: "30px", fontFamily: 'sans-serif', borderRadius: '20px' }}
          title="Non LUCC Event Member List"
          data={rows}
          columns={columns}
          options={{
            filtering: true,
            paging: true,
            tableLayout: "auto",
            exportButton: true,
            pageSizeOptions:['10', '25', '50', '100','200']
          }}
        />
      </MuiThemeProvider>
    </div>
  );
}

export default A;