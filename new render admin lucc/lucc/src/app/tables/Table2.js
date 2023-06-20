import React, { useEffect } from 'react';
import { Link, } from 'react-router-dom';
import MaterialTable from 'material-table'
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core'
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, clearErrors, } from "../../actions/userAction";

function A({ history}) {

  const dispatch = useDispatch();
  const { error, users } = useSelector((state) => state.allUsers);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    
    
    dispatch(getAllUsers());
    console.log(error,'rimel')
  }, [dispatch, alert, error,  history]);



const rows = [];

users &&
users.forEach((item) => {
    rows.push({
      id: item._id,
      fname: item.firstName+item.lastName,
      email: item.email,
      role: item.role,
      status:item.activation_status,
      
      
    });
  });
  // render:rowData=><Link href={`api=${rowData.email}`} target="_blank">{rowData.id}</Link> 
  const columns = [
    // { title: "ID", field: "id", },
    { title: "First-Name", field: "fname"},
    { title: "Email", field: "email" },
    {title:"Role",field:'role'},
    
    {title:"Status",field:'status',
    render: (rowData) => {
      return ( 
      <>
      {rowData.status=='active'? 
      <div className="badge badge-outline-success">Active</div>
     : <div className="badge badge-outline-danger">De-Active</div>
      }
      
      </>
      )},
    },

    {title:"Action",field:'username',
    render: (rowData) => {
      return (
        <>
          <Link to={"/user"+rowData.id}> 
            {/* <button style={{background:'pink'}}><ModeEditIcon style={{background:'blue',color:'red'}}/>Edit</button> */}
            <button  className="btn btn-primary btn-fw">Edit</button>
          </Link>
          {/* <DeleteOutline
            className="userListDelete"
            onClick={() => handleDelete(params.row.id)}
          /> */}
        </>
      );
    },}
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
      <h1 align="center">LUCC Member list</h1>
      <MuiThemeProvider theme={theme}>
      <MaterialTable style={{color:'snow',padding:"30px",fontFamily:'sans-serif',borderRadius:'20px'}}
        title="LUCC Members Data"
        data={rows}
        columns={columns} 
        options={{
          filtering: true,
          paging:true,
          tableLayout:"auto"
        }}
        />
         </MuiThemeProvider>
    </div>
  );
}

export default A;












