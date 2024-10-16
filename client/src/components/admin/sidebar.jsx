
import { ChartNoAxesCombined, Container, Flame, LayoutDashboard, ListTodo } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'

const adminSidebarMenuItem = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: <LayoutDashboard />

  },
  {
    id: 'products',
    label: 'Products',
    path: '/admin/products',
    icon :<ListTodo />

  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/admin/orders',
    icon: <Container />

  },
]

const MenuItems = ({setOpen}) => {
  const navigate = useNavigate()
  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSidebarMenuItem.map((menuItem) => (
        <div 
          key={menuItem.id} 
          onClick={() => {
            navigate(menuItem.path);
            if (setOpen) {
              setOpen(false);
            }
          }} 
          className="flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-100 text-muted-foreground"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  )
}



const AdminSidebar = ({open ,setOpen}) => {
  const navigate = useNavigate()
  return (
    <>
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side='left' className='w-64'>
        <div className="flex flex-col h-full">
          <SheetHeader className='border-b'>
            <SheetTitle className='flex gap-2 mt-5 mb-5' >
            <Flame size={30} />
            <h1 className='text-xl font-extrabold'>Trendify <span className='text-sm align-middle font-semibold'>-Admin</span></h1>
              </SheetTitle>
          </SheetHeader>
          <MenuItems setOpen={setOpen} />
        </div>
      </SheetContent>
    </Sheet>
    <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
      <div onClick={()=>navigate('/admin/dashboard')} className="flex items-center gap-2 cursor-pointer">
      <Flame  size={30} />
        <h1 className='text-xl font-extrabold'>Trendify <span className='text-sm align-middle font-semibold'>-Admin</span></h1>
      </div>
      <MenuItems />
    </aside>
    </>
  )
}

export default AdminSidebar