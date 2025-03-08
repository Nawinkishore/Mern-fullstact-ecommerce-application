import CommonForm from "@/components/common/form";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {loginFormControls} from '../../config/index'
const initialState = {
  email: "",
  password: "",
};
const login = () => {
  const [formData, setFormData] = useState(initialState);
  function onSubmit(){};
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account yet?
          <Link
            className="font-medium text-primary ml-2 hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm 
      formControls={loginFormControls}
      formData={formData}
      setFormData={setFormData}
      buttonText={'Login'}
      onSubmit={onSubmit}
      />
    </div>
  );
};

export default login;
