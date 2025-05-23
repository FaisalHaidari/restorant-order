export default function MenuItem() {
    return (
        <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadpw-black/25 transition all">
           <div className="text-center"> <img src="/ekmekarasi.jpeg" className="max-h-auto max-h-24
           block mx-auto" alt="ekmekarasi" /> </div>
            <h4 className=" font-semibold text-xl my-3">Ekmek Arasi</h4>
            <p className="text-gray-500 text-sm">Ankara Kavurma , Sogan , Doamtes , Kikek , Acibiber</p>
            <button className="mt-4 bg-orange-500 text-white rounded-full px-8 py-2 mt-2">Add to cart 340 ₺</button>
        </div>
    );
}