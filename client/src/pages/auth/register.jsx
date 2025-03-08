import CommonForm from "@/components/common/form";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {registerFormControls} from '../../config/index'
const initialState = {
  name: "",
  email: "",
  password: "",
};
const register = () => {
  const [formData, setFormData] = useState(initialState);
  function onSubmit(){};
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already Have an account
          <Link
            className="font-medium text-primary ml-2 hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm 
      formControls={registerFormControls}
      formData={formData}
      setFormData={setFormData}
      buttonText={'Sign Up'}
      onSubmit={onSubmit}
      />
    </div>
  );
};

export default register;
