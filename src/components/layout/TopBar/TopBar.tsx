

import React from 'react'
import { SearchInput } from '../../shared/SearchInput'
import { FaHome} from 'react-icons/fa'
import {  BottomNavigation, BottomNavigationAction } from '@mui/material'
import Link from 'next/link'
import { FaShop } from 'react-icons/fa6'
import { CartIcon } from './CartIcon'

export const TopBar = () => {

  return (
    <>
      <div className='fixed top-5 left-2 right-2 lg:left-32 lg:right-32 rounded-full bg-[rgb(255,255,255,0.6)] gap-5 lg:gap-0 shadow-md z-10 flex justify-between items-center px-10 py-2 backdrop-blur-sm'>
          <div className=' justify-center items-center h-16 gap-3 hidden lg:flex'>
              <Link
                  href="/"
              >
                  <p >Inicio</p>
              </Link>
              <Link
                  href="/tienda"
              >
                  <p >Tienda</p>
              </Link>
          </div>

          <div className="w-full lg:w-2/3">
              <SearchInput />
          </div>
          
          <div className='hidden lg:flex justify-center items-center gap-3 text-lg'>
            <CartIcon />
          </div>
      </div>

      <div className='fixed bottom-0 left-0 right-0 lg:hidden z-10'>
        <BottomNavigation
          showLabels
          sx={{
            backgroundColor: 'rgb(255, 255, 255, 0.6)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <BottomNavigationAction href='/' LinkComponent={Link} label="Inicio" icon={<FaHome size={24} />}  />
          <BottomNavigationAction href='/tienda' LinkComponent={Link}  label="Tienda" icon={<FaShop size={24} />} />
          <BottomNavigationAction href='/carrito' LinkComponent={Link}  label="carrito" icon={<CartIcon /> } />
        </BottomNavigation>
      </div>
    </>
  )
}
