"use client"

import { PageContainer } from '@/components/shared/PageContainer'
import { ProductCard } from '@/components/shared/ProductCard'
import { getNews, MonthlyArticle } from '@/server/strapi'
import React, { useEffect, useState } from 'react'

export const NewProducts = () => {

    const [newProducts, setNewProducts] = useState<MonthlyArticle[]>([])

    const fetchNewProducts = async () => {
        try {
            const response = await getNews()
            setNewProducts(response)
        } catch (error) {
            console.error('Error fetching new products:', error)
            setNewProducts([])
        }
    }

    useEffect(() => {
        fetchNewProducts()
    }, [])

    
  return (
    <PageContainer className='mb-20'>
        <div className="p-5">
            <h2 className="text-4xl font-bold">¡Nuevos peluches recién salidos del taller!</h2>
            <p className="text-lg mb-5">
              Descubre nuestros nuevos peluches, cada uno diseñado para brindarte ternura y alegría. 
              ¡No te los pierdas!
            </p>
        </div>
                <div className="flex  gap-5 py-2 px-5 overflow-x-auto">

                    {
                        newProducts.map((product) => (
                            <ProductCard 
                                key={product.id}
                                product={product}
                                className={`max-w-80 min-w-72`}
                            />
                        ))
                    }

                </div>

      </PageContainer>

    )
}
