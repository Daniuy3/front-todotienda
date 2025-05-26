import { PageContainer } from "@/components/shared/PageContainer";
import { ProductCard } from "@/components/shared/ProductCard";
import { getCategoriesWithProducts } from "@/server/strapi";
import { unstable_cache } from "next/cache";
import Image from "next/image";

const cachedCategories = unstable_cache(() => {
        const categories = getCategoriesWithProducts();
        return categories;
    }, ["categories"],
    {
        revalidate: 10 * 60 * 24, // 24 hours
        tags: ["categories"],
    }
);

export default async function Page() {

    const categories = await cachedCategories();

    return (
        <>
        <PageContainer className="lg:pt-40 relative h-[600]">
            <Image 
                fill
                alt="Banner"
                src="/tienda-banner.png"
                className="object-cover w-full h-full"
            />
            <h1 
                className="absolute bottom-0 left-1/2 text-[140px] md:text-[200px] lg:text-[400px] font-bold text-white transform -translate-x-1/2"
                style={{
                    lineHeight: "0.65",
                }}
            >
                Tienda
            </h1>

            
        </PageContainer>
        <PageContainer
            style={{
                paddingLeft:0,
                paddingRight:0,
            }}
        >
            <div className="lg:w-11/12 mx-auto bg-white -translate-y-5 lg:-translate-y-28 lg:px-20 py-10 px-2 lg:rounded-lg shadow-lg mg-whi">
                {
                    categories.map((category) => (
                        <div key={category.id} className="mb-10">
                            <h3 className="text-3xl font-bold mb-5 text-primary-400 capitalize">{category.name}</h3>
                            <div className="flex overflow-x-auto w-full gap-5 py-4">
                                {
                                    category.articles.map((article) => (
                                        <ProductCard 
                                            key={article.id}
                                            product={article}
                                            className="max-w-72 min-w-72"
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </PageContainer>
        </>
    );
}