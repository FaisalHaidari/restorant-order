import Right from "../icons/Right";
import Image from "next/image";

export default function Hero() {
    return (
        <>
        <section className="hero mt-4">
            <div className="py-12">
                <h1 className="text-4xl font-semibold leading-normal">Her şey <span className="text-orange-500">Kavurma</span><br/> ile daha güzel.</h1>
                <p className="my-6 text-gray-500 text-sm">Kavurma, her günü tamamlayan eksik parçadır; hayatın basit ama lezzetli bir neşesidir
                </p>
                <div className="flex gap-4  text-sm">
                    <button className="bg-orange-500 flex gap-2 text-white uppercase flex items-center gap-2 px-4 py-2 rounded-full">Hemen Sipariş Ver
                       <Right className="w-6 h-6 text-gray-500" />
                         </button>
                    <button className="flex gap-2 py-2 text-gary-600 font-semibold  ">Daha Fazla Ogren
                                                        <Right className="w-6 h-6 text-gray-500" />
                    </button>
                </div>
                </div>
             <div className="w-100 h-100 relative">
                <Image
                    src={'/ankarapilav.jpeg'}
                    alt={'Ankara Pilavı'}
                    layout="fill"
                    objectFit="contain"
                />
             </div>
        </section>
        </>
    );
}