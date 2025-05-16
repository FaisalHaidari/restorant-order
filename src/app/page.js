
import Header from "./components/layout/Header";
import Hero from "./components/layout/Hero";
import HomeMenu from "./components/layout/HomeMenu";
import SectionHeaders from "./components/layout/SectionHeaders";

export default function Home() {
  return (
<>
      <Header />
      <Hero />
      <HomeMenu />
      <section className="text-center mt-16">
        <sectionHeaders 
        subHeader ={'Our story '}
        mainHeader ={'About Us'}/>
       
       <div className="text-gray-500 max-w-md mx-auto mt-6 flex-col gap-4">
        <p>
          Atakum Kavurmacısı, 1995 yılında kuruldu ve o zamandan beri
          mükemmel kavurma sunma konusunda kendini adamıştır. Geleneksel
          tariflerimizle hazırlanan kavurmamız, taze ve kaliteli malzemelerle
          yapılmaktadır. Müşterilerimize en iyi deneyimi sunmak için sürekli
          çalışıyoruz.
        </p>
       </div>
      </section>
      <section className="text-center my-8">
        <sectionHeaders 
        subHeader ={'DON\'T MISS OUT'}
        mainHeader ={'Contact us'}/>
       <div className="mt-8">
        <a className="text-4xl underline text-gray-500 "
        href ="tel:+905555555555">
          +90 555 555 55 55
        </a>
       </div>
      </section>
      <footer className="border-t P-8 text-center text-gray-500 mt-16"> 
        &copy; 2023 Atakum Kavurmacısı. Tüm hakları saklıdır.
      
      </footer>
</>
  );
}
