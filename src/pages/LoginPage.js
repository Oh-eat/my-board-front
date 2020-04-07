import React from "react";
import FormTemplate from "../components/common/FormTemplate.js";
import LoginForm from "../containers/auth/LoginForm";

function LoginPage(props) {
  return (
    <FormTemplate>
      <LoginForm />
    </FormTemplate>
  );
}

export default LoginPage;
