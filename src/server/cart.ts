"use server"

import { CartStoreItem } from "@/stores/cartstore";
import axios from "axios";


const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
})


export interface responseCart {
    data: {
        message: string
        data: {
            "user": {
            "name": string,
            "email": string
            },
            "cart": [
                {
                    "id": string,
                    "title": string,
                    "price": string,
                    "quantity": string,
                    "image": string
                }
            ]
        }
    }
}

export const sendCartOrder = async (cart: CartStoreItem[], user: {name: string, email: string}) => {

    const cartData = cart.map((cartItem) => ({
        ...cartItem.item,
        quantity: cartItem.quantity,
        image: cartItem.item.cover.url,
    }))

    console.log(client.defaults.baseURL)

    const cartOrder = {
        user,
        cart: cartData,
    }

    try {
        const response = await client.post<responseCart>("cart/send", cartOrder )
        return response.data
    }
    catch (error) {
        console.error("Error sending cart order:", error)
        throw error
    }
}