import React from "react";
import FormTemplate from "../components/common/FormTemplate.js";
import RegisterForm from "../containers/auth/RegisterForm";

function RegisterPage(props) {
  return (
    <FormTemplate>
      <RegisterForm />
    </FormTemplate>
  );
}

export default RegisterPage;
