import { PageContainer } from "@/components/shared/PageContainer";
import { ProductCard } from "@/components/shared/ProductCard";
import { getCategoriesWithProducts, getCategoryBySlug } from "@/server/strapi";
import { Rating } from "@mui/material";
import Image from "next/image";
import { AddToCart } from "./AddToCart";

export const revalidate = 86400; // 1 day
export const dynamicParams = true

export async function generateStaticParams () {
    const categories = await getCategoriesWithProducts()

    return categories.map((category) => {
        return category.articles.map((article) => {
            return {
                slug: category.slug,
                itemId: article.id
            }
        }
        )
    })
}


export default async function Page({
    params
}: {
    params: Promise<{ slug: string, itemId: string }>
}) {

    const { slug, itemId } = await params

    const category = await getCategoryBySlug(slug)
    const article = category.articles.find((article) => article.slug.split("/").at(-1) === itemId)

    const otherArticles = category.articles.filter((article) => article.slug.split("/").at(-1) !== itemId)

    if (!category) {
            return (
                <PageContainer className="flex justify-center items-center h-screen">
                    <h1 className="text-3xl font-bold">No se encontró la categoría</h1>
                </PageContainer>
            );
    }

    if (!article) {
        return (
            <PageContainer className="flex justify-center items-center h-screen">
                <h1 className="text-3xl font-bold">No se encontró el producto</h1>
            </PageContainer>
        );
    }

    return (
        <div>
            <PageContainer className="pt-30 lg:pt-30 " >
                <div className="flex flex-col-reverse lg:flex-row  gap-5 items-center">
                    <div className="relative w-full max-w-[500px]  lg:w-1/3 h-96 overflow-hidden shadow-lg">
                        <Image 
                            src={article.cover.url}
                            alt={article.title}
                            fill
                            className="w-full h-auto rounded-lg shadow-lg object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-5 lg:w-2/3 px-2 h-full justify-center items-start">
                    <div>
                        <h1 
                            className="text-3xl w-2/3 lg:text-5xl font-bold text-primary-600 capitalize max-w-xl"
                        >
                            Conoce nuestro Producto de
                        <span
                                className="text-2xl lg:text-4xl font-bold text-primary-400 block"
                        >
                                {article.title}
                        </span>
                        </h1>

                        <div className=" text-md flex gap-5 items-center">
                            <Rating
                                name="read-only"
                                value={4.5}
                                readOnly
                                precision={0.5}
                                size="large"
                            />
                            <span className=" font-light text-gray-700">4.5/5</span>
                        </div>

                    </div>

                        <p className="text-lg text-gray-700 max-w-xl">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                        </p>
                        
                        <div className="w-full lg:max-w-96">
                            <AddToCart 
                                {...article}
                            />
                        </div>
                    </div>
                </div>
                <div className="pb-30 px-2">
                    <h2
                        className="lg:text-4xl text-2xl font-bold text-primary-600 capitalize max-w-96 mt-10 mb-5"
                    >
                        Ver más productos de la categoría 
                        <span
                            className="lg:text-4xl text-2xl font-bold text-primary-400 block"
                        >
                            {category.name}
                        </span>
                    </h2>

                        <div className="flex overflow-x-auto w-full gap-5 h-96 py-2">
                            {
                                otherArticles.map((article) => (
                                    <ProductCard 
                                        key={article.id}
                                        description={article.description??""}
                                        image={article.cover.url}
                                        title={article.title}
                                        price={article.price}
                                        slug={article.slug}
                                        className="min-w-[300px]"
                                    />
                                ))
                            }
                        </div>
                </div>
            </PageContainer>
        </div>
    );
}