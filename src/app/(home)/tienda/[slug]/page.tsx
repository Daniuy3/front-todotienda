import { PageContainer } from "@/components/shared/PageContainer";
import { ProductCard } from "@/components/shared/ProductCard";
import {  getCategoriesWithProducts, getCategoryBySlug } from "@/server/strapi";

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
        <PageContainer className="pt-30 lg:pt-30 px-2 pb-30" >
            <h1 
                className="text-5xl font-bold text-primary-600 capitalize max-w-xl mb-10"
            >
               Conoce nuestros Productos de 
               <span
                    className="text-4xl font-bold text-primary-400 block"
               >
                    {category.name}
               </span>
            </h1>

            <div className="flex overflow-x-auto w-full gap-5 h-96 py-2">
                {
                    category.articles.map((article) => (
                        <ProductCard 
                            key={article.id}
                            description={article.description??""}
                            image={article.cover.url}
                            title={article.title}
                            slug={article.slug}
                            price={article.price}
                            className="min-w-72 h-full"
                        />
                    ))
                }
            </div>
        </PageContainer>
    );
}