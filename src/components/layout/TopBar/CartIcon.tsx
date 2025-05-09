"use client"

import { useCartStore } from '@/stores/cartstore'
import { Badge } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { IoCartOutline } from 'react-icons/io5'

export const CartIcon = () => {

    const { cart } = useCartStore()

    const totalItems = cart.length

  return (
    <Link href="/carrito" >
        <Badge badgeContent={totalItems} color="secondary">
              <IoCartOutline  size={24}/>
        </Badge>
    </Link>
  )
}
