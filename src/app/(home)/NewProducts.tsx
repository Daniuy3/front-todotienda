"use client"

import { PageContainer } from '@/components/shared/PageContainer'
import { ProductCard } from '@/components/shared/ProductCard'
import { getNews, MonthlyArticle } from '@/server/strapi'
import React, { useEffect, useState } from 'react'

export const NewProducts = () => {

    const [newProducts, setNewProducts] = useState<MonthlyArticle[]>([])
    const [loading, setLoading] = useState(true)

    const fetchNewProducts = async () => {
        try {
            const response = await getNews()
            setNewProducts(response)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching new products:', error)
            setNewProducts([])
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchNewProducts()
    }, [])

    const rowSpans = ["row-span-3", "row-span-3", "row-span-2", "row-span-3", "row-span-3", "row-span-2"]
    const colSpans = ["col-span-1", "col-span-1", "col-span-2", "col-span-1", "col-span-1", "col-span-2"]
    const alignments  = ["vertical", "vertical", "horizontal", "vertical", "vertical", "horizontal"]
    
  return (
    <PageContainer className='mb-20'>
        <div className="p-5 lg:px-30">
            <h2 className="text-4xl font-bold">¡Nuevos peluches recién salidos del taller!</h2>
            <p className="text-lg mb-5">
              Descubre nuestros nuevos peluches, cada uno diseñado para brindarte ternura y alegría. 
              ¡No te los pierdas!
            </p>
        </div>
                <div className="grid lg:grid-cols-4 gap-5 grid-rows-5 lg:h-[550px] lg:px-30 ">

                    {
                        loading && (
                            [...Array(6)].map((_, index) => (
                                <div key={index} className={`animate-pulse bg-gray-300 rounded-lg ${rowSpans[index]} ${colSpans[index]} `} />
                        )
                        ))
                    }
                    {
                        newProducts.map((product,index) => (
                            <ProductCard 
                                key={product.id}
                                image={product.cover.url}
                                title={product.title}
                                slug={product.slug}
                                price={product.price}
                                description={product.description || ""}
                                className={`${rowSpans[index]} ${colSpans[index]}`}
                                alignment={alignments[index] as "vertical" | "horizontal" }
                            />
                        ))
                    }

                </div>

      </PageContainer>

    )
}
