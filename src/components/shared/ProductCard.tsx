"use client"


import { MonthlyArticle } from '@/server/strapi'
import { useCartStore } from '@/stores/cartstore'
import { Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'


interface Props {
    product: MonthlyArticle
    rating?: number
    className?: string
}

export const ProductCard = ({ product, className: classStyle } : Props) => {

    const [loading, setLoading] = useState(true)
    const { addToCart, getProductById, removeFromCart } = useCartStore()
    const quantity = getProductById(product.id)?.quantity || 0

  return (
    <div
        className={`flex flex-col min-h-92 shadow-lg max-w-72 min-w-72` + classStyle}
    >
        <Link href={`/tienda/${product.slug}`}>
            <div className={`relative h-72 w-full`}>
            
                <div className='absolute inset-0  bg-gray-300 animate-pulse transition-all duration-300 ease-in-out' style={{opacity: loading? 1 : 0}}   />
                
                <Image 
                    src={product.cover.url}
                    alt={product.title}
                    fill
                    className='object-cover w-full transition-all duration-300 ease-in-out'
                    style={{opacity: loading? 0 : 1}}
                    title={product.title}
                    priority={false}
                    loading='lazy'
                    onLoad={() => setLoading(false)}
                    onError={() => setLoading(false)}
                    />
            </div>
        </Link>
        <div
            className='flex flex-col justify-between px-4 py-2 h-36 bg-white'
        >
            <h3 className='text-lg font-bold text-gray-800 mt-2'>{product.title}</h3>
            <p className='text-gray-600 text-md ml-auto'>${product.price}</p>
            <div className='mt-auto flex'>
                <Button
                    hidden={!quantity}
                    onClick={() => removeFromCart(product.id)}
                color='error' 
                >
                    -
                </Button>

                <Button 
                    variant='contained' 
                    color='error' 
                    className='w-full'
                    onClick={quantity ? undefined : () => addToCart(product)}
                    >
                    {
                        quantity ? quantity : "Añadir al carrito"
                    }
                </Button>

                <Button
                    color='error' 
                    hidden={!quantity}
                    onClick={() => addToCart(product)}
                >
                    +
                </Button>
            </div>
        </div>
    </div>
  )
}
