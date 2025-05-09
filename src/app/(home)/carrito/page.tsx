"use client"

import { PageContainer } from "@/components/shared/PageContainer";
import { useCartStore } from "@/stores/cartstore";
import { Item } from "./Item";
import { Button } from "@mui/material";
import { LuSendHorizontal } from "react-icons/lu";
import { useEffect, useState } from "react";
import { CartDialog } from "./CartDialog";


export default function Page() {

    const { cart } = useCartStore()
    const [open, setOpen] = useState(false)
    const [disabled, setDisabled] = useState(false)


    useEffect(() => {
        if (cart.length === 0) {
            setDisabled(true)
        }
    }, [cart])


    return (
        <PageContainer className="pt-30 lg:pt-30 px-5 " >
            <div
                className="flex flex-col md:flex-row justify-between gap-5  mb-10"
            >
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl md:text-6xl font-bold">Carrito</h1>
                    <h2 className="text-xl md:text-2xl font-medium">Productos en el carrito</h2>
                </div>

                <div className="flex flex-col">
                    <Button
                        style={{marginTop: "auto"}}
                        variant="contained"
                        endIcon={<LuSendHorizontal   size={20} />}
                        color='inherit' 
                        className='flex items-center gap-1'
                        sx={{
                            backgroundColor: "black",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "gray",
                            },
                        }}
                        disabled={disabled}
                        onClick={() => setOpen(true)}
                    >
                        Enviar Pedido
                    </Button>
                </div>
            </div>

            <div
                className="grid grid-cols-1 lg:grid-cols-2 mb-20 "
            >
                {
                    cart.length > 0 ? (
                        cart.map((cartItem, index) => (
                            <Item  item={cartItem} key={`cartitem-${index}`}   />
                        ))
                    ) : (
                        <p className="text-lg">No hay productos en el carrito</p>
                    )
                }
            </div>

            <CartDialog 
                open={open}
                onClose={() => setOpen(false)}
            />
        </PageContainer>
    );
}