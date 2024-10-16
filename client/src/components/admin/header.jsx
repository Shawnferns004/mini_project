import React from 'react'
import { Button } from '../ui/button'
import { AlignJustify, LogOut } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/store/auth-slice'
import { useToast } from '@/hooks/use-toast'

const AdminHeader = ({setOpen}) => {
  const dispatch=  useDispatch()
  const{toast} = useToast()

  function handleLogout() {
    dispatch(logoutUser())
    toast({
      title: 'Logged out successfully !',
    })
  }
  return (
    <header className='flex items-center justify-between px-4 py-3 bg-background border-b'>
      <Button onClick={()=> setOpen(true)} className='lg:hidden sm:block'>
      <AlignJustify className='' />
      <span className='sr-only'>Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button onClick={handleLogout} className='inline-flex gap-2 items-center rounded-xl px-4 py-2 text-sm font-medium shadow'>
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  )
}

export default AdminHeader