


import React, { HTMLAttributes} from 'react'


export const PageContainer = ({ children, className: classStyle, ...rest } : HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`${classStyle} lg:px-30 lg:py-10  `} {...rest}>
        {children}
    </div>
  )
}
