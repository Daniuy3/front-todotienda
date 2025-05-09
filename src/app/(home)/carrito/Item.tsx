


import { CartStoreItem, useCartStore } from '@/stores/cartstore'
import { Button, ButtonGroup } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import { FaHeart, FaMinus, FaPlus, FaTrash } from 'react-icons/fa'

interface Props {
    item: CartStoreItem
}

export const Item = ({ item: {item, quantity} } : Props) => {

    const [loading, setLoading] = useState(true)
    const { addToCart, deleteItem, removeFromCart} = useCartStore()

  return (
    <div  className="flex items-center md:gap-5 border-t-[1px] border-gray-300 py-5">
        <div
            className="relative w-16 h-16 md:w-24 md:h-24"
        >
            <div className="absolute inset-0 bg-gray-200 rounded-lg animate-pulse" style={{
                zIndex: loading ? 1 : -1,
                opacity: loading ? 1 : 0,
                transition: "opacity 0.3s ease-in-out",
            }} />

            <Image 
                src={item.cover.url}
                alt={item.title}
                width={100}
                height={100}
                className=" w-16 h-16 md:w-24 md:h-24 object-cover rounded-lg opacity-0"
                priority={false}
                loading="lazy"
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
                style={{
                    zIndex: loading ? -1 : 1,
                    opacity: loading ? 0 : 1,
                    transition: "opacity 0.3s ease-in-out",
                }}
            />
        </div>
        <div className="flex flex-col flex-1 px-5">
            <h3 className="text-xl font-bold">{item.title}</h3>
            <div className="flex items-center gap-5">
                <p className="text-lg">${item.price}</p>
                {
                    item.available ? (
                        <p className="text-green-500">Disponible</p>
                    ) : (
                        <p className="text-red-500">No disponible</p>
                    )
                }
            </div>
            <div
                className="flex gap-5 mt-2 justify-between"
            >
                <div
                    className="flex items-center justify-between gap-5 border-[1px] border-gray-300 text-gray-300 rounded-lg px-2 py-1 max-w-36"
                >

                        <Button
                            onClick={() => removeFromCart(item.id)}
                            variant="text"
                            size="small"
                            sx={{
                                width: 30,
                                minWidth: 0,
                                color: "#b5bac4",
                                "&:hover": {
                                    backgroundColor: "rgba(181,186,196,0.1)",
                                },
                            }}
                        >
                            <FaMinus  size={20}  />
                        </Button>

                        <p className="text-lg font-bold text-gray-500">{quantity}</p>

                        <Button
                            onClick={() => addToCart(item)}
                            variant="text"
                            size="small"
                            sx={{
                                width: 30,
                                minWidth: 0,
                                color: "#b5bac4",
                                "&:hover": {
                                    backgroundColor: "rgba(181,186,196,0.1)",
                                },
                            }}
                        >
                            <FaPlus size={16} />
                        </Button>
                    
                </div>
                <ButtonGroup 
                    variant="text" 
                    sx={{
                        color: "#b5bac4",
                        "& .MuiButton-root": {
                            color: "#b5bac4",
                        },
                        "& .MuiButton-root:hover": {
                            backgroundColor: "rgba(106, 114, 130, 0.1)",
                        },
                        "& .MuiButtonGroup-grouped:not(:last-of-type)": {
                            borderRight: "1px solid #edeef1",
                        },
                    }}
                >
                    <Button>
                        <FaHeart size={20} />
                    </Button>
                    <Button
                        onClick={() => deleteItem(item.id)}
                    >
                        <FaTrash size={20}  />
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    </div>
  )
}
