import CommonForm from '@/components/commom/form'
import { loginFormControls } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { loginUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const initialState ={
  email: "",
  password: ""
}

const AuthLogin = () => {


  const [formData, setformData] = useState(initialState)
  const dispatch = useDispatch()
  const {toast} = useToast()

  const onSubmit = (event)=>{
    event.preventDefault()
    dispatch(loginUser(formData)).then((data)=>{
      if (data?.payload?.success) {
        toast({
          title: data?.payload.message,
        })
        // navigate('/')
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
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your Trendify Account</h1>
        <p className="">Don't have a account ?  
          <Link className='font-medium ml-2 text-primary hover:underline' to='/auth/register'>Register</Link>
        </p>
      </div>
      <CommonForm 
      formControls={loginFormControls}
      buttonText={'Sign In'}
      formData={formData}
      setFormData={setformData}
      onSubmit={onSubmit}
      />
    </div>
  )
}

export default AuthLogin