import { PageContainer } from "@/components/shared/PageContainer";
import { ProductCard } from "@/components/shared/ProductCard";
import {  getCategoriesWithProducts, getCategoryBySlug } from "@/server/strapi";
import Image from "next/image";

export const revalidate = 86400; // 1 day
export const dynamicParams = true

export async function generateStaticParams () {
    const categories = await getCategoriesWithProducts()

    return categories.map((category) => {
        return {
            slug: category.slug
        }
    })
}


export default async function Page({
    params,
  }: {
    params: Promise<{ slug: string}>
}) {

    const {slug }= await params;

  
    if (!slug) {
        return (
            <PageContainer className="flex justify-center items-center h-screen">
                <h1 className="text-3xl font-bold">No se encontró la categoría</h1>
            </PageContainer>
        );
    }

    const category = await getCategoryBySlug(slug)

    if (!category) {
        return (
            <PageContainer className="flex justify-center items-center h-screen">
                <h1 className="text-3xl font-bold">No se encontró la categoría</h1>
            </PageContainer>
        );
    }

    return (

        <>
            <PageContainer className="lg:pt-40 relative h-[600]">
                <Image 
                                fill
                                alt="Banner"
                                src="/tienda-banner-3.png"
                                className="object-cover w-full h-full"
                            />
                            <h1 
                                className="block text-center absolute bottom-0 left-1/2 text-[100px] md:text-[150px] lg:text-[300px] font-bold text-white transform -translate-x-1/2"
                                style={{
                                    lineHeight: "0.65",
                                }}
                            >
                                {category.name}
                            </h1>
            </PageContainer>
            <PageContainer 
                style={{
                    paddingLeft:0,
                    paddingRight:0,
                }} 
            >
               <div
                    className="lg:w-11/12 mx-auto bg-white -translate-y-5 lg:-translate-y-20 lg:px-5 py-10 px-2 lg:rounded-lg shadow-lg"
                >
                    

                    <div className="flex flex-wrap gap-5 py-2 justify-center">
                        {
                            category.articles.map((article) => (
                                <ProductCard 
                                    key={article.id}
                                    product={article}
                                    className="max-w-72 min-w-72 shadow-sm"
                                />
                            ))
                        }
                    </div>
               </div>
            </PageContainer> 
        </>
    );
}