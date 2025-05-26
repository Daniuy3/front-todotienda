"use client"

import { CategoryCard } from '@/components/shared/CategoryCard'
import { PageContainer } from '@/components/shared/PageContainer'
import { Category, getCategories } from '@/server/strapi';
import React, { useEffect, useState } from 'react'


export const Categories = () => {

  const [categories, setcategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

    const fetchCategories = async () => {
      setLoading(true)
      setcategories([])
      try {
        const response = await getCategories();
        setcategories(response);
        setLoading(false)
      }

      catch (error) {
        console.error('Error fetching categories:', error);
        setcategories([]);
        setLoading(false)
      }
    }

    useEffect(() => {
      fetchCategories();
    }, [])
  return (
    <PageContainer className='py-10 px-4 lg:w-11/12 mx-auto -translate-y-5 lg:-translate-y-10 bg-white lg:rounded-2xl'>

        <div>
            <h2 className="text-4xl font-bold">Categorias</h2>
            <p className="ml-2 mb-4">Explora nuestras categorias de productos</p>
        </div>

        <div className="flex justify-between items-center overflow-x-auto gap-4 py-4 px-2 lg:px-0">
          {
            loading && (                
                  [...Array(6)].map((_, index) => (
                    <div
                      key={"category-loading-" + index}
                    >
                      <div  className="w-52 h-48 bg-gray-200" />
                      <div className="w-52 h-12 py-2 border-[1px] animate-pulse  border-neutral-100" >
                        <div className="bg-gray-200 animate-pulse w-full h-full" />
                      </div>
                    </div>
                  ))
            )
          }
          {
            categories.map(({cover,name,slug}) => (

                <CategoryCard
                  alt={name}
                  key={slug}
                  href={'/tienda/' + slug}
                  title={name}
                  image={cover.formats.medium.url}
                />
            ))
          }
        </div>
      </PageContainer>
  )
}
