import Image from "next/image";

export default function HomeMenu() {
    return (
        <section className="">
            <div className="relative">
                <div className="h-60 w-60 absolute left-0 top-0 ">
                    <Image src={'/rize.jpeg'} layout={'fill'} objectFit={'contain'} alt={'Rize'} />
                </div>
                <div className="h-60 w-60 absolute right-0 top-0 ">
                    <Image src={'/hamburger.jpeg'} layout={'fill'} objectFit={'contain'} alt={'Hamburger'} />
                </div>
                <div className="text-center ">
                    <h3 className="uppercase text-gray-600 font-semibold leading-3">Göz Atmak</h3>
                    <h2 className="text-orange-500 font-bold text-4xl italic">Menü</h2>
                </div>
            </div>
        </section>
    );
}