"use client"

import { MonthlyArticle } from '@/server/strapi'
import { useCartStore } from '@/stores/cartstore'
import { Button } from '@mui/material'
import React from 'react'
import { IoCartOutline } from 'react-icons/io5'

interface Props {
    cover: MonthlyArticle['cover']
    price: MonthlyArticle['price']
    title: MonthlyArticle['title']
    available: MonthlyArticle['available']
    id : MonthlyArticle['id']
    discount_price: MonthlyArticle['discount_price']

}

export const AddToCart = ({ available, cover, price, title, id, discount_price } : Props) => {

    const { addToCart } = useCartStore()
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
    <Button
        variant='contained'
        sx={{
            backgroundColor: 'rgb(255, 255, 255, 0.8)',
            color: '#34201B',
            marginTop: '1rem',
            width: '100%',
            '&:hover': {
                backgroundColor: 'rgb(255, 255, 255, 0.9)',
                opacity: 0.8,
            },
        }}
        startIcon={<IoCartOutline />}
        onClick={handleAddToCart}
    >
        Agregar al Carrito
    </Button>
    

  )
}
