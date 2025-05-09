"use client"

import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { useCartStore } from '@/stores/cartstore';
import { Alert, Button, DialogActions, Snackbar, TextField } from '@mui/material';
import { DialogCarItem } from './DialogCarItem';
import { sendCartOrder } from '@/server/cart';

interface Props {
    open: boolean
    onClose: () => void
}

export const CartDialog = ({ open,onClose } : Props) => {

    const { cart, clearCart } = useCartStore()
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [openSnackbar, setOpenSnackbar] = useState(false)

    const [formFields, setFormFields] = useState({
        name: "",
        email: "",
    })


    const handleSendOrder = async () => {
        setLoading(true)
        
        try {
            await sendCartOrder(cart, formFields)
            setLoading(false)
            setOpenSnackbar(true)
            clearCart()
            onClose()
        }

        catch (error) {
            console.error("Error sending order:", error)
            setLoading(false)
        }
        

        
    }

    useEffect(() => {
        if (cart.length === 0) {
            setDisabled(true)
            return
        }
        if( formFields.name === "" || formFields.email === "") {
            setDisabled(true)
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if( !emailRegex.test(formFields.email) ) {
            setDisabled(true)
            return
        }

        setDisabled(false)

    }, [cart, formFields])

  return (
    <>
        <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
    >
        <DialogTitle>
            <div
                className='flex md:items-center justify-between flex-col md:flex-row gap-5'
            >
                <h2>Resumen de Pedido</h2>
                <p
                    className='text-lg font-bold'
                >
                    Total: $
                    {
                        cart.reduce((acc, {item, quantity}) => acc + (item.price * quantity), 0)
                    }
                </p>
            </div>
        </DialogTitle>

        <DialogContent>
            <p
                className='text-gray-500 text-sm'
            >
                Por favor, completa los siguientes campos para enviar tu pedido. 
                Recibirás un correo de confirmación con los detalles de tu compra.
            </p>
        <div className='my-5 flex flex-col gap-5 lg:flex-row lg:gap-10'>
            <TextField 
                id="outlined-basic" 
                label="Correo" 
                variant="outlined" 
                type="email"
                value={formFields.email}
                onChange={(e) => setFormFields({
                    ...formFields,
                    email: e.target.value
                })}
            />
            <TextField 
                id="outlined-basic" 
                label="Nombre" 
                variant="outlined" 
                type="text"
                value={formFields.name}
                onChange={(e) => setFormFields({
                    ...formFields,
                    name: e.target.value
                })}
            />
        </div>
            <div
                className="flex flex-col gap-3 md:grid md:grid-cols-2 "
            >
                {
                    cart.map((item, index) => (
                        <DialogCarItem
                            key={"cart-item-dialog-" + index}
                            item={item}
                        />
                    ))
                }
            </div>
        </DialogContent>
        
        <DialogActions>
           
          <Button 
            autoFocus 
            onClick={handleSendOrder} 
            variant='contained' 
            loading={loading}
            sx={{
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                    backgroundColor: "gray",
                },
            }}
            disabled={disabled}
          >
            Enviar Pedido
          </Button>
        </DialogActions>
    </Dialog>
    <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
        >
            Tu pedido ha sido enviado con éxito. Recibirás un correo de confirmación en breve.
        </Alert>
    </Snackbar>
    </>
  )
}
