"use client"
import { useCartItems } from "../components/AppContext";

export default function CartPage() {
  const { cartItems } = useCartItems();
  const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold text-orange-500 mb-4">Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="w-full max-w-xl flex flex-col gap-4">
          {cartItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-white rounded-lg shadow p-4">
              {item.image && (
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
              )}
              <div className="flex-1">
                <div className="font-bold text-lg">{item.name}</div>
                <div className="text-gray-500">{item.description}</div>
              </div>
              <div className="text-orange-500 font-bold text-lg">{item.price} ₺</div>
            </div>
          ))}
          <div className="flex justify-end mt-4">
            <span className="text-xl font-bold text-orange-600">Total: {total} ₺</span>
          </div>
        </div>
      )}
    </section>
  );
} 