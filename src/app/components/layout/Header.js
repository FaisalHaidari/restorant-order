import Link from "next/link";


export default function Header() {

    return (
    <header className="flex items-center justify-between ">
  <Link className = "text-orange-500 font-semibold text-2xl"href={"/"}>
  ATAKUM KAVURMACISI
  </Link>

<nav className="flex items-center gap-8 text-gray-500 font-semibold">
  <Link href={"/"}>Anasayfa</Link>
  <Link href={""}>Menu</Link>
  <Link href={""}>Hakkında</Link>
  <Link href={""}>ILETISIM</Link>

</nav>
<nav className="flex items-center gap-4 text-gray-500 font-semibold">
  <Link href={'/login'}>Login</Link>
<Link href={'/register'} className="bg-orange-500 rounded-full text-white px-8 py-2">Register</Link>
</nav>
</header>);




}