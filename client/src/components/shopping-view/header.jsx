import { CircleUser, Flame, LogOut, Menu, ShoppingCart } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '@/config'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { logoutUser } from '@/store/auth-slice'


const MenuItem = () => {
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Link className="text-sm font-medium" key={menuItem.id} to={menuItem.path}>
          {menuItem.label}
        </Link>
      ))}
    </nav>
  );
};

 

const HeaderRightContent =() =>{
  const { user }= useSelector(state=>state.auth)
  const dispatch = useDispatch()

  function handleLogout(){
    dispatch(logoutUser())
  }

  const navigate = useNavigate()
  return (
    <div className="flex lg:items-center lg:flex-row  flex-col gap-4">
      <Button variant='outline' size='icon'>
        <ShoppingCart className='w-6 h-6' />
        <span className="sr-only">User cart</span>
      </Button>
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className='bg-black'>
              <AvatarFallback className='bg-black text-white font-extrabold' >{user.name ? user.name[0].toUpperCase(): 'u'}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side='right' className='w-56'>
            <DropdownMenuLabel>Logged in as {user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuItem onClick={()=>navigate('/shop/acount')} >
            <CircleUser className='mr-2 h-4 w-4' />
            Account
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem onClick={handleLogout} >
            <LogOut className='mr-2 h-4 w-4' />
            Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
      </DropdownMenu> 
    </div>
  )
}


const ShoppingHeader = () => {

  const {isAuthenticated,}= useSelector(state=>state.auth)
  // console.log(user, "user")
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to='/shop/home' className='flex items-center gap-2'>
        <Flame className='h-6' />
        <span className='font-bold'>TRENDIFY</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline' size='icon' className='lg:hidden' >
              <span className="sr-only">Toggle header menu</span>
              <Menu className='h-6 w-6' />
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='w-full max-w-xs'>
            <MenuItem />
          <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItem />
        </div>
        <div className="hidden lg:block">
            <HeaderRightContent />
          </div>

      </div>
    </header>
  )
}

export default ShoppingHeader