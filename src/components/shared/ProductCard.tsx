"use client"


import { Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'


interface Props {
    alignment?: "vertical" | "horizontal"
    image: string
    title: string
    slug: string
    price: number
    description: string
    rating?: number
    className?: string
}

export const ProductCard = ({ description,image,price,slug,title,alignment="vertical", className: classStyle } : Props) => {

    const [loading, setLoading] = useState(true)


  return (
    <div
        className={`flex ${alignment === "horizontal" ? "flex-row min-h-52" : "flex-col min-h-80"} shadow-md ` + classStyle}
    >
        <div className={`relative h-full w-full  ${alignment === "horizontal" && "max-w-60" }`}>
         
            <div className='absolute inset-0  bg-gray-300 animate-pulse transition-all duration-300 ease-in-out' style={{opacity: loading? 1 : 0}}   />
            
            <Image 
                src={image}
                alt={title}
                fill
                className='object-cover w-full h-full transition-all duration-300 ease-in-out'
                style={{opacity: loading? 0 : 1}}
                title={title}
                priority={false}
                loading='lazy'
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
            />
        </div>

        <div className='flex flex-col justify-between w-full'>
            <div
                className='flex flex-col gap-2 p-2'

            >
                <h2 className='text-lg font-semibold'>{title}</h2>
                <p className='text-sm text-gray-500'>{description}</p>
            </div>

            <div className='flex items-center justify-between p-2 border-t-2 border-gray-200 '>
                <p className='text-lg font-semibold'>${price}</p>
                <div className='flex items-center gap-2'>
                    <Link href={`/tienda/${slug}`}>
                        <Button 
                            variant='contained' 
                            color='inherit' 
                            size='small'
                            className='flex items-center gap-1'
                            sx={{
                                backgroundColor: "black",
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "gray",
                                },
                            }}
                        >
                            Ver producto
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
