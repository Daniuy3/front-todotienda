import { PageContainer } from "@/components/shared/PageContainer";
import { Categories } from "./Categories";
import { Hero } from "./Hero";
import { MetaCard } from "@/components/shared/MetaCard";
import { FaMedal, FaShieldAlt, FaTruck } from "react-icons/fa";
import Image from "next/image";
import { FaArrowRightLong, FaHandsHoldingChild } from "react-icons/fa6";
import Link from "next/link";
import { Testimonial } from "@/components/shared/Testimonial";
import { Monthly } from "./Monthly";
import { NewProducts } from "./NewProducts";


export default function Page() {

  return (
    <div>

      <Hero />
      <Categories />
      <PageContainer
        className="w-11/12 mx-auto -translate-y-3  flex gap-10 flex-col lg:flex-row items-center justify-between bg-white p-10 mt-10"
      >
        <div className="flex flex-col justify-center gap-4 w-full lg:w-8/12">
          <div className="lg:w-9/12">
              <h2 className="text-4xl font-bold"> ¿Por qué Comprar con Nosotros?</h2>
              <p className="mt-5 text-lg">
                Más que una tienda, somos una experiencia de ternura, calidad y confianza. Aquí te contamos por qué nuestros clientes nos prefieren:
              </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <MetaCard 
              title="Envíos rápidos a todo México"
              href="/nosotros"
              icon={<FaTruck size={32} />}
            />
            <MetaCard 
              title="Atención personalizada y Humana"
              href="/nosotros"
              icon={<FaHandsHoldingChild  size={32} />}
            />
            <MetaCard 
              title="Calidad premium, ternura garantizada"
              href="/nosotros"
              icon={<FaMedal  size={32}/>}
            />
            <MetaCard 
              title="Cambios y devoluciones sin complicaciones"
              href="/nosotros"
              icon={<FaShieldAlt  size={32}/>}
            />
          </div>
        </div>
        <div className="relative w-full lg:w-xl">
          <Image 
            src="/categories/fox.jpg"
            alt="Category 1"
            width={576}  
            height={576}
            className="object-cover w-full h-full shadow-lg"
            title="Category 1"
            priority={false}
          />
        </div>
      </PageContainer>

      <Monthly />
      
      

      <PageContainer className="bg-white p-10 mt-10">
            <div className="flex flex-col lg:flex-row">
              <h2 className="text-2xl lg:text-4xl font-bold">Lo que dicen quienes ya abrazaron su peluche</h2>
              <div>
                <p className="lg:text-lg mb-5">
                Aquí puedes leer lo que nuestros clientes opinan sobre la calidad, la atención y la experiencia de comprar con nosotros.
                </p>
                <Link
                  href="/testimonios"
                  title="link a testimonios"
                  aria-label="Testimonios"
                  className="mt-10 text-sm"
                >
                  <p className="text-primary-500 hover:text-primary-700 transition duration-300 flex items-center gap-2">
                    Ver Testimonios
                    <FaArrowRightLong className='font-light ' fontWeight={300}/>
                  </p>
                </Link>
              </div>
            </div>
            
            <div className="flex gap-5 mt-5 overflow-x-auto">
              <Testimonial />
              <Testimonial />
              <Testimonial />
            </div>

      </PageContainer>

      <NewProducts />

    </div>
  );
}