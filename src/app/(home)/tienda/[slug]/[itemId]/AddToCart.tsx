"use client"

import { MonthlyArticle } from '@/server/strapi'
import { useCartStore } from '@/stores/cartstore'
import { Button } from '@mui/material'
import React from 'react'

interface Props {
    cover: MonthlyArticle['cover']
    price: MonthlyArticle['price']
    title: MonthlyArticle['title']
    available: MonthlyArticle['available']
    id : MonthlyArticle['id']
    discount_price: MonthlyArticle['discount_price']

}

export const AddToCart = ({ available, cover, price, title, id, discount_price } : Props) => {

    const { addToCart,removeFromCart,getProductById } = useCartStore()
    const quantity = getProductById(id)?.quantity || 0
    const handleAddToCart = () => {
        addToCart({
            cover,
            price,
            title,
            available,
            id, 
            discount_price
        })
    }

  return (
                <div className='mt-auto flex'>
                    <Button
                        hidden={!quantity}
                        onClick={() => removeFromCart(id)}
                    color='error' 
                    >
                        -
                    </Button>
    
                    <Button 
                        variant='contained' 
                        color='error' 
                        className='w-full'
                        onClick={quantity ? undefined : () => handleAddToCart() }
                        >
                        {
                            quantity ? quantity : "Añadir al carrito"
                        }
                    </Button>
    
                    <Button
                        color='error' 
                        hidden={!quantity}
                        onClick={() => handleAddToCart()}
                    >
                        +
                    </Button>
                </div>
    

  )
}
