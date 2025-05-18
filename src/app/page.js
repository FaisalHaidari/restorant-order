import Hero from "./components/layout/Hero";
import HomeMenu from "./components/layout/HomeMenu";
import SectionHeaders from "./components/layout/SectionHeaders";

export default function Home() {

  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center mt-16">
        {/* Change this line */}
        <SectionHeaders
          subHeader={'Our story '}
          mainHeader={'About Us'}
        />
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
        {/* And change this line too */}
        <SectionHeaders
          subHeader={'DON\'T MISS OUT'}
          mainHeader={'Contact us'}
        />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500 "
            href ="tel:+905555555555">
            +90 555 555 55 55
          </a>
        </div>
      </section>
    </>
  );
}