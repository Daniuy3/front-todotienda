


import { Avatar, Rating } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import {  FaArrowRightLong } from 'react-icons/fa6'

export const Testimonial = () => {
  return (
    <div    className='bg-white p-4 rounded-md shadow-lg flex flex-col gap-2 '>
        <div className='flex gap-2 items-center justify-between'>
            <div className='flex gap-2 items-center'>
                <Avatar sx={{ bgcolor: "#F5D6CA" }}>D</Avatar>
                <div>
                    <p>Daniel Trinidad</p>
                    <p>28/Abr/2025</p>
                </div>
            </div>
            <div>
                <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly/>
            </div>
           
        </div>
            <p className='text-sm text-gray-600'>
            Pedí un peluche personalizado para el cumpleaños de mi novia y quedó increíble. El bordado con su nombre le encantó y llegó justo a tiempo. La atención fue súper amable, me resolvieron todo por WhatsApp. ¡100% recomendable!
            </p>
            <Link
                href="/testimonios"
                className='text-primary-500 hover:text-primary-700 transition duration-300 flex items-center gap-2'
                title={"link a "  + "testimonios"}
                aria-label={"testimonios"}
                role="button"
                tabIndex={0}
            >
            
                <p className='text-primary-500 hover:text-primary-700 transition duration-300 flex items-center gap-2'>
                    Ver más testimonios
                </p>
                <FaArrowRightLong className='font-light ' fontWeight={300}/>
            </Link>
    </div>
  )
}

