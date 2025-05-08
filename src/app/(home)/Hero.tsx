import { PageContainer } from '@/components/shared/PageContainer'
import Image from 'next/image'
import React from 'react'

export const Hero = () => {
  return (
    <PageContainer className="lg:pt-40 relative h-[600]">
                <Image 
                    fill
                    alt="Banner"
                    src="/tienda-banner-2.png"
                    className="object-cover w-full h-full"
                />
                <h1 
                    className="absolute bottom-0 left-1/2 text-[140px] md:text-[200px] lg:text-[400px] font-bold text-white transform -translate-x-1/2"
                    style={{
                        lineHeight: "0.65",
                    }}
                >
                    Inicio
                </h1>
    
                
            </PageContainer>
  )
}
