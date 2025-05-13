import Link from "next/link";


export default function Home() {
  return (
<>
<header>
  <Link className = "text-red-500 font-semibold text-2xl"href="">ATAKUM KAVURMACISI</Link>
</header>
<nav>
  <Link href={""}>Anasayfa</Link>
  <Link href={""}>Menu</Link>
  <Link href={""}>Hakkında</Link>
  <Link href={""}>ILETISIM</Link>
  <Link href={""}>Giriş Yap</Link>
</nav>
</>
  );
}
