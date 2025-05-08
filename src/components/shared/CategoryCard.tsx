"use client"


import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'

interface Props {
    title: string;
    image: string;
    href: string;
    alt: string;
}

export const CategoryCard = ({ alt, href, image, title } : Props) => {

  const [loading, setLoading] = useState(true)

  return (
    <Link
        href={href}
        className="flex flex-col items-center justify-center text-gray-800 hover:text-gray-600 transition duration-300 relative"
        title={"link a "  + title}
        aria-label={title}
        role="button"
        tabIndex={0}
    >
        {
          loading && (
            <>
              <div 
                className="absolute top-0 left-0 w-52 h-48 bg-gray-200 animate-pulse" 
              />
              
              <div 
                className="absolute top-48 left-0 w-52 h-12 py-2 border-[1px] animate-pulse  border-neutral-100" 
              >
                  <div className="bg-gray-200 animate-pulse w-full h-full" />
              </div>
            </>
          )
        }
        
        <div className="bg-white shadow-lg"
            style={{
                opacity: loading ? 0 : 1,
                transition: 'opacity 0.5s ease-in-out',
            }}
            
        >
            <div className="w-52 h-48 relative ">
              <Image 
                src={image}
                alt={alt}
                width={80}  
                height={80}
                className="object-cover w-full h-full"
                title={title}
                priority={false}
                quality={100}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
              />
            </div>
            
            <p className="text-center text-xl py-2">
                {title}
            </p>
        </div>
    </Link>
  )
}
