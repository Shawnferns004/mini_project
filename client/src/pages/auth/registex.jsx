import CommonForm from '@/components/commom/form'
import { registerFormControls } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { registerUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const initialState ={
  name: "",
  email: "",
  password: ""
}

const AuthRegister = () => {


  const [formData, setformData] = useState(initialState)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {toast} = useToast()


  const onSubmit = (event)=>{
    event.preventDefault()
    dispatch(registerUser(formData)).then((data)=>{
      if (data?.payload?.success) {
        toast({
          title: data?.payload.message,
        })
        navigate('/auth/login')
      }else{
        toast({
          title: data?.payload.message,
          status: "error", 
          variant: "destructive"
        });
      }
      console.log(data)
    })
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Create new Trendify Account</h1>
        <p className="">Already have a account ? 
          <Link className='font-medium ml-2 text-primary hover:underline' to='/auth/login'>Login</Link>
        </p>
      </div>
      <CommonForm 
      formControls={registerFormControls}
      buttonText={'Sign Up'}
      formData={formData}
      setFormData={setformData}
      onSubmit={onSubmit}
      />
    </div>
  )
}

export default AuthRegister