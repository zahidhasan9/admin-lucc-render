import React from "react";
import { useSelector } from "react-redux";
import Lucc_form from './Lucc_form'
import Non_Lucc_form from './non_lucc_form'

const BasicElements = () => {

  const { loading, error, userclass } = useSelector((state) => state.user);

  let FormRender
  if (userclass.role == "admin") {
    FormRender = < Lucc_form />
  } else if (userclass.role == "super-admin") {

    FormRender = <Non_Lucc_form />
  } else {
    FormRender = <h1>hello hacker</h1>
  }


  return (
    <div>
      {FormRender}
    </div>

  )

}

export default BasicElements
