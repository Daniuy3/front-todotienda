"use client"


import { CartStoreItem } from '@/stores/cartstore'
import Image from 'next/image'
import React, { useState } from 'react'

interface Props {
    item: CartStoreItem
}

export const DialogCarItem = ({ item:{item, quantity} } : Props) => {

    const [loading, setLoading] = useState(true)
    
  return (
    <div
        className="flex items-center gap-3 border-b-[1px] border-gray-300 py-2"
    >

        {
            <div
                className="relative w-10 h-10"
            >
                <div className="absolute inset-0 bg-gray-200 rounded-lg animate-pulse" style={{
                    zIndex: loading ? 1 : -1,
                    opacity: loading ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out",
                }} />

                <Image 
                    src={item.cover.url}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="w-10 h-10 object-cover rounded-lg opacity-0"
                    priority={false}
                    loading="lazy"
                    style={{
                        zIndex: loading ? -1 : 1,
                        opacity: loading ? 0 : 1,
                        transition: "opacity 0.3s ease-in-out",
                    }}
                    onLoad={() => setLoading(false)}
                    onError={() => setLoading(false)}
                />


            </div>
        }
        
        <div className='flex-1'>
            <h3 className="text-lg font-bold">{item.title}</h3>
            <div className="flex items-center gap-5">
                <p className="text-lg">
                    ${item.price}
                    <span
                        className="text-gray-500 text-sm"
                    >
                        x{quantity}
                    </span>
                </p>
                
                <p className='ml-auto block'>
                    $
                    {
                        item.price * quantity
                    }
                </p>
            </div>
        </div>
    </div>
  )
}
