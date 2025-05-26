import { PageContainer } from '@/components/shared/PageContainer'
import Image from 'next/image'
import React from 'react'

export const Hero = () => {
  return (
    <PageContainer className="lg:pt-40 h-[600] absolute top-0 left-0 right-0 -z-10">
        <Image 
            fill
            alt="Banner"
            src="/tienda-banner-3.png"
            className="object-cover w-full h-full"
        />    
    </PageContainer>
  )
}
