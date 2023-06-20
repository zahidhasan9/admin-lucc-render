import React from "react";
import { useSelector } from "react-redux";
import Admin from './Adminform'
import Super from './SuperAdminform'

const BasicElements = () => {

  const { userclass } = useSelector((state) => state.user);


  let FormRender
  if (userclass.role == "admin") {
    FormRender = <Admin />
  } else if (userclass.role == "super-admin") {

    FormRender = <Super />
  } else {
    FormRender = <h1>hello hacker</h1>
  }
  return (
    <div>

      {/* {userclass.role=="admin" ?  <Admin/> : <Super/>} */}
      {FormRender}

    </div>

  )

}

export default BasicElements
