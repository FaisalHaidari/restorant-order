"use client";
import Right from "../icons/Right";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Hero() {
    useEffect(() => {
        localStorage.removeItem("token");
    }, []);

    return (
        <>
        <section className="hero mt-4">
            <div className="py-12">
                <h1 className="text-4xl font-semibold leading-normal">Her şey <span className="text-orange-500">Kavurma</span><br/> ile daha güzel.</h1>
                <p className="my-6 text-gray-500 text-sm">Kavurma, her günü tamamlayan eksik parçadır; hayatın basit ama lezzetli bir neşesidir
                </p>
                <div className="flex gap-4 text-sm">
                    <button type="button" className="bg-orange-500 flex items-center gap-8 text-white uppercase px-8 py-2 rounded-full whitespace-nowrap min-w-[220px]">
                        <span className="inline-block align-middle">Hemen Sipariş Ver</span>
                        <span className="inline-block align-middle"><Right className="w-6 h-6 text-white" /></span>
                    </button>
                    <button type="button" className="flex items-center gap-8 py-2 text-gray-600 font-semibold whitespace-nowrap min-w-[180px]">
                        <span className="inline-block align-middle">Daha Fazla Ogren</span>
                        <span className="inline-block align-middle"><Right className="w-6 h-6 text-gray-600" /></span>
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