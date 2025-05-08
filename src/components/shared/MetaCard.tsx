

import Link from 'next/link';
import React, { ReactNode } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6';

interface Props {
    icon: ReactNode;
    title: string;
    href: string;
}
export const MetaCard = ({ href,icon,title } : Props) => {
  return (
    <div className='shadow-lg bg-white p-4 gap-3 rounded-md flex justify-around items-center'>
        <div className='rounded-full bg-primary-50 p-2'>
            {icon}
        </div>
        <div>
            <h3 className='text-lg font-bold'>{title}</h3>
            <Link 
                href={href}
                className='text-primary-500 hover:text-primary-700 transition duration-300 flex items-center gap-2'
                title={"link a "  + title}
                aria-label={title}
                role="button"
                tabIndex={0}
            >
            
                <p>
                    Conoce más
                </p>

                <FaArrowRightLong className='font-light ' fontWeight={300}/>
            </Link>

        </div>
    </div>
  )
}
