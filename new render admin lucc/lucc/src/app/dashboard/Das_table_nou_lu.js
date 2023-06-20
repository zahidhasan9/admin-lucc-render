import React, { useState, useEffect } from 'react';
import  axios from "axios";
import { DataGrid, GridToolbar } from '@material-ui/data-grid';



 
const columns = [
  // { field: 'id', headerName: 'ID', width: 70 },
  // { field: 'firstName', headerName: 'First name', width: 130 },
  // { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'i', headerName: 'ID', width: 40 },
  { field: 'fullname', headerName: 'Full Name', width: 150 },
  
  
  { field: 'email', headerName: 'Email', width:200 },
  { field: 'Phone', headerName: 'Phone ', width: 150 },
  { field: 'contest_name', headerName: 'Contest', width: 150  },
  {
    field:'reg_status',
    headerName: 'Status',
    width: 130,
    renderCell:  (params) => {
      return ( 
      <>
      {params.row.reg_status=="registerd"? 
      
      <div className="badge badge-outline-success">Registerd</div>
     : <div className="badge badge-outline-danger">{params.row.reg_status}</div>
      }
      
      </>
      )},
  },
  
];

export default function InitialFilters(history) {
  
  const [users, setuser] = useState('');
  useEffect(() => {

    axios.get(`${process.env.REACT_APP_ULR_API}/eveent/user`)
   .then((response) => {
     setuser(response.data);
    
   
   });
 
   }, [ ]);
 

  const rows = [];
  var i = 1;
  users &&
users.forEach((item) => {

  if(item.reg_status=='registerd'){
      //or   state.length==0
    rows.push({
        id: item._id, 
        fullname:item.firstName+" "+item.lastName, 
        reg_status:item.reg_status,
        email:item.email,
        Phone:item.phone_number,
        contest_name:item.contest_name,
        // address:item.address,
        i:i++
        
    });
  }  
})

  


  // const [data, setData] = useState([])

  return (
    <div style={{ height: 400, width: '100%' ,}}>
     <DataGrid  style={{ height: 400, width: '100%' ,color:'white',background:'#191c24'}}
     rows={rows} 
     columns={columns}
     components={{ Toolbar: GridToolbar ,
    }}
     sx={{
      boxShadow: 0,
      border: 0,
      borderColor: 'primary.light',
      '& .MuiDataGrid-cell:hover': {
        color: 'primary.main',
      },
    }}
     />
    </div>
  );
}