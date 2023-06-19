import React, { useEffect } from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, clearErrors} from "../../actions/userAction";




const columns = [
  
  { field: 'i', headerName: 'ID', width: 40 },
  { field: 'fullname', headerName: 'Full Name', width: 150 },
  
 
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'Phone', headerName: 'Phone ', width: 150  },
  { field: 'contest_name', headerName: 'Contest', width: 150  },
   
  {field: 'reg_status',
    headerName: 'Status',
    // type: 'number',
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
 
  const dispatch = useDispatch();
  const { error, users } = useSelector((state) => state.allUsers);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllUsers());
    // console.log(error,'rimel')
  }, [dispatch, alert, error,  history]);

  

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
        address:item.address,
        contest_name:item.contest_name,
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