import React, { useState , useEffect } from 'react';
import img1 from "../../images/cart/img1.jpeg"
import img2 from "../../images/cart/img2.jpg"
import img3 from "../../images/cart/img3.jpeg"
import img4 from "../../images/cart/img4.jpeg"
import img5 from "../../images/cart/img5.jpeg"
import img6 from "../../images/cart/img6.jpeg"
import img7 from "../../images/cart/img7.jpeg"
import img8 from "../../images/cart/img8.jpeg"
import img9 from "../../images/cart/img9.jpeg"
import img10 from "../../images/cart/img10.jpeg"
import img11 from "../../images/cart/img11.jpeg"
import img12 from "../../images/cart/img12.jpeg"
import img13 from "../../images/cart/img13.jpeg"


const gymTools = [
    { id: 1, img: img1, name: 'Dumbbell', description: '10kg ergonomic dumbbell for strength training and muscle toning.', price: 2000 },
    { id: 2, img: img2, name: 'Yoga Mat', description: 'Premium non-slip yoga mat for a comfortable and stable workout.', price: 1500 },
    { id: 3, img: img3, name: 'Kettlebell', description: '15kg high-quality kettlebell designed for full-body workouts.', price: 2500 },
    { id: 4, img: img4, name: 'Treadmill', description: 'Advanced electric treadmill with multiple workout programs and incline settings.', price: 25000 },
    { id: 5, img: img5, name: 'Resistance Bands', description: 'Set of 5 durable resistance bands perfect for strength training and flexibility exercises.', price: 300 },
    { id: 6, img: img6, name: 'Pull-Up Bar', description: 'Sturdy doorway pull-up bar for upper body and core strengthening.', price: 350 },
    { id: 7, img: img7, name: 'Medicine Ball', description: '10kg medicine ball ideal for dynamic strength and power workouts.', price: 400 },
    { id: 8, img: img8, name: 'Stationary Bike', description: 'Compact indoor exercise bike with adjustable resistance levels for a cardio workout.', price: 1500 },
    { id: 9, img: img9, name: 'Rowing Machine', description: 'Foldable rowing machine for a full-body cardiovascular workout.', price: 2000 },
    { id: 10, img: img10, name: 'Smith Machine', description: 'Multi-functional smith machine for a comprehensive strength training experience.', price: 5000 },
    { id: 11, img: img11, name: 'Leg Press Machine', description: 'Adjustable leg press machine for targeting lower body muscles with precision.', price: 4500 },
    { id: 12, img: img12, name: 'Chest Press Machine', description: 'Incline chest press machine to build and tone pectoral muscles.', price: 4000 },
    { id: 13, img: img13, name: 'Cable Machine', description: 'Versatile cable machine with multiple attachments for various strength exercises.', price: 3500 }
];

  
const ProductCard = ({ product, addToCart, initiatePayment }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:scale-105 hover:shadow-slate-400">
    <img src={product.img} alt={product.name} className="w-32 h-32 md:w-40 md:h-40 object-cover mb-4" />
    <h2 className="text-md md:text-lg font-bold">{product.name}</h2>
    <p className="text-sm md:text-base text-gray-600">{product.description}</p>
    <p className="text-md md:text-lg font-semibold mt-2">Rs.{product.price}</p>
    <div className="flex space-x-4 mt-4">
      <button className="bg-blue-500 text-white px-3 py-1 md:px-4 md:py-2 rounded" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
      <button className="bg-green-500 text-white px-3 py-1 md:px-4 md:py-2 rounded" onClick={() => initiatePayment(product.price, product.name)}>
        Buy
      </button>
    </div>
  </div>
);const CartItem = ({ item, updateQuantity, removeItem }) => (
  <div className="flex justify-between items-center my-2 p-2 bg-white rounded">
    <span className="flex-1">{item.name}</span>
    <div className="flex items-center space-x-2">
      <button 
        className="px-2 py-1 bg-gray-200 rounded"
        onClick={() => updateQuantity(item.id, item.quantity - 1)}
      >
        -
      </button>
      <span>{item.quantity}</span>
      <button 
        className="px-2 py-1 bg-gray-200 rounded"
        onClick={() => updateQuantity(item.id, item.quantity + 1)}
      >
        +
      </button>
      <span className="ml-4 w-20 text-right">Rs.{(item.price * item.quantity).toFixed(2)}</span>
      <button 
        className="ml-2 text-red-500"
        onClick={() => removeItem(item.id)}
      >
        Remove
      </button>
    </div>
  </div>
);

const Cart = ({ cartItems, updateQuantity, removeItem, initiatePayment }) => {
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col justify-between h-auto">
      <div>
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">No items added yet.</p>
        ) : (
          <div className="space-y-2">
            {cartItems.map(item => (
              <CartItem 
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>Rs.{totalPrice.toFixed(2)}</span>
          </div>
          <button
            className="bg-blue-500 text-white w-full py-2 rounded mt-4"
            onClick={() => initiatePayment(totalPrice, "Cart Total")}
          >
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
};

const ECart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeItem = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const initiatePayment = (amount, description) => {
    const options = {
      key: "rzp_test_RJ2efv7ySjDwOt",
      amount: amount * 100,
      currency: "INR",
      name: "FitCheck",
      description,
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Your Name",
        email: "your-email@example.com",
        contact: "1234567890",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };return (
    <div className="flex bg-gray-100 flex-col md:flex-row h-full p-4 md:p-8">
      <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:pr-4 mb-4 md:mb-0">
        {gymTools.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            addToCart={addToCart} 
            initiatePayment={initiatePayment} 
          />
        ))}
      </div>

      <div className="w-full md:w-1/4">
        <Cart 
          cartItems={cartItems} 
          updateQuantity={updateQuantity}
          removeItem={removeItem}
          initiatePayment={initiatePayment} 
        />
      </div>
    </div>
  );
};

export default ECart;