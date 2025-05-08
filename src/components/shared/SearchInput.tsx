"use client"

import { ArticleSearch, getAllArticles } from '@/server/strapi'
import { Autocomplete, TextField } from '@mui/material'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'

type State = Omit<ArticleSearch, 'category'>[]

export const SearchInput = () => {
  
  const [options, setOptions] = useState<State>([])

  const Header = (
    <div className='flex justify-center items-center gap-2 '>
      <CiSearch size={24}/>
      <p >Buscar productos</p>
    </div>
  )

  const handleSearch = async () => {
    const data = await getAllArticles()
    setOptions(data)
  }

  useEffect(() => {
    handleSearch()
  }
  , [])

  return (
    
    <Autocomplete 
        options={options.map((option) => option.title)}
        renderInput={(params) => <TextField  {...params} label={Header} />}
        renderOption={(params, option) => (
          <Link
            href={`/tienda/${options.find((item) => item.title === option)?.slug}`}
            className='w-full'
            key={option}
          >
            <li {...params}>
              <div className='flex justify-center items-center gap-2'>
                <p>{option}</p>
              </div>
            </li>
          </Link>
        )}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#E0E0E0',
              color: '#E0E0E0',
              
            },
            '&:hover fieldset': {
              borderColor: '#75493F',
              color: '#75493F',
              textEmphasisColor: '#75493F',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#75493F',
              color: '#75493F',
              textEmphasisColor: '#75493F',
            },
            '& .Mui-focused': {
              color: '#75493F',
              textEmphasisColor: '#75493F',
            },
          },
        }}
        onChange={(e, value) => console.log({value})}
    />
  )
}
