import { PageContainer } from "@/components/shared/PageContainer";
import { ProductCard } from "@/components/shared/ProductCard";
import { getCategoriesWithProducts, getCategoryBySlug } from "@/server/strapi";
import { Rating } from "@mui/material";
import Image from "next/image";
import { AddToCart } from "./AddToCart";
import { Hero } from "./Hero";

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
        <>
            <Hero />
            <PageContainer className="w-11/12 mx-auto bg-white p-8 mt-32 rounded-lg lg:px-20 shadow-lg mb-15">
                <div className="flex flex-col-reverse lg:flex-row lg:justify-center gap-5 items-center">
                    <div className="relative w-full max-w-[500px]  lg:w-1/3 h-96 overflow-hidden shadow-lg">
                        <Image 
                            src={article.cover.url}
                            alt={article.title}
                            fill
                            className="w-full h-auto rounded-lg shadow-lg object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-5 px-2 h-full justify-center items-start">
                    <div>
                        <h1 
                            className="text-3xl lg:text-5xl font-bold text-primary-600 capitalize   "
                        >
                            {article.title}
                        </h1>

                        <div className=" text-md flex gap-5 items-center justify-center lg:justify-start">
                            <Rating
                                name="read-only"
                                value={4.5}
                                readOnly
                                precision={0.5}
                                size="large"
                            />
                            <span className=" font-light text-gray-700">4.5</span>
                        </div>

                    </div>

                        <p className="text-lg text-gray-700 max-w-xl">
                            {article.description}
                        </p>
                        
                        <div className="w-full lg:max-w-96 mt-auto">
                            <AddToCart 
                                {...article}
                            />
                        </div>
                    </div>
                </div>
                <div className="pb-30 px-2">
                    <h2
                        className="lg:text-4xl text-2xl font-bold text-primary-600 capitalize mt-10 mb-5"
                    >
                        Productos Relacionados
                    </h2>

                        <div className="gap-5 py-2 flex flex-wrap bg-white justify-center ">
                            {
                                otherArticles.map((article) => (
                                    <ProductCard
                                        key={article.id + "" + article.slug} 
                                        product={article}
                                        className="max-w-80 min-w-72"
                                    />
                                ))
                            }
                        </div>
                </div>
            </PageContainer>
        </>
    );
}