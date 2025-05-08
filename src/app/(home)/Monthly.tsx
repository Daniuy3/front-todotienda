"use client"

import { PageContainer } from '@/components/shared/PageContainer'
import { getMonthly, MonthlyArticle } from '@/server/strapi'
import { Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoCartOutline } from 'react-icons/io5'

export const Monthly = () => {

    const [monthly, setMonthly] = useState<MonthlyArticle | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchMonthly = async () => {
        try {
            const response = await getMonthly()
            setMonthly(response)
        } catch (error) {
            console.error('Error fetching monthly article:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMonthly()
    }, [])



  return (
    <PageContainer className="px-0 bg-radial from-primary-200 to-primary-50 grid grid-cols-1 lg:grid-cols-2 gap-4 p-10 mt-10">
        <div className=" h-96 lg:h-[600px] w-full relative rounded-lg overflow-hidden">
            
            <div 
                className="bg-gray-300 animate-pulse absolute" 
                style={{ width: 632, height: 600, opacity: loading? 1 : 0, transition: 'opacity 0.5s ease-in-out', zIndex: loading? 2 : -1 }} 
            />
                
            {   
                monthly && (
                    <Image 
                        src={monthly.cover.url}
                        alt={monthly.title}
                        width={632}
                        height={600}
                        className="object-cover w-full h-full shadow-lg"
                        title={monthly.title}
                        priority={false}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 632px, 600px"
                        loading="lazy"
                    />
                )
            }
        </div>
        <div className="lg:p-10 flex flex-col justify-center items-start gap-4 p-3">
          <h2 className="text-3xl lg:text-6xl font-bold">El Articulo del Mes.</h2>
            {
                loading ? (
                    <div className="bg-gray-300 animate-pulse w-1/2 h-10 rounded-lg" />
                ) : (
                    <h3 className="text-2xl lg:text-4xl font-bold">{monthly?.title}</h3>
                )
            }
            {   
                loading ? (
                    <div className="bg-gray-300 animate-pulse w-full h-20 rounded-lg" />
                ) : (
                    <p className="text-lg  max-w-xl">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                        </p>
                )
            }

            {
                loading ? (
                    <div className="bg-gray-300 animate-pulse w-1/2 h-10 rounded-lg" />
                ) : (
                    <Link
                        href={`/tienda/${monthly?.slug}`}
                        title={`Comprar ${monthly?.title}`}
                        aria-label={`Comprar ${monthly?.title}`}
                        className="w-full"
                    >
                        <Button
                            size="large"
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
                        >
                            Comprar Ahora
                        </Button>  
                    </Link> 
                )
            }       
        </div>
      </PageContainer>
  )
}
