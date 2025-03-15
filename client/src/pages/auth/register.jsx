import CommonForm from "@/components/common/form";
import React, { useState } from "react";
import { data, Link } from "react-router-dom";
import {registerFormControls} from '../../config/index'
import { registerUser } from "../../../store/auth-slice/index";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ToastProvider } from "@/components/ui/toast";
;
const initialState = {
  userName: "",
  email: "",
  password: "",
};
const register = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function onSubmit(e){
    e.preventDefault();
    dispatch(registerUser(formData)).then((data)=>
    {
      console.log(data);
      if(data?.payload?.success)
        {
        
         toast.success(data?.payload?.message);
          navigate('/auth/login')
        }
        else{
          toast.error(data?.payload?.message);
        }
    }
  );
    
  };
  console.log(formData);
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
