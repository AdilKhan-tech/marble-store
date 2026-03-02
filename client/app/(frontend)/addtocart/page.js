"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const relatedProducts = [
    { id: 1, name: 'HBD teenage year', price: 'SR 173', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&h=200&fit=crop' },
    { id: 2, name: 'HBD Level 13', price: 'SR 173', image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=200&h=200&fit=crop' },
    { id: 3, name: 'HBD Lulu', price: 'SR 173', image: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6b1?w=200&h=200&fit=crop' },
    { id: 4, name: 'HBD roblox', price: 'SR 173', image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=200&h=200&fit=crop' },
    { id: 5, name: 'HBD 7th Salah', price: 'SR 173', image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=200&h=200&fit=crop' },
    { id: 6, name: 'Cookie-hbd-002', price: 'SR 173', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=200&h=200&fit=crop' },
    { id: 7, name: 'Cookie-hbd-005', price: 'SR 173', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&h=200&fit=crop' },
    { id: 8, name: 'Cookie-hbd-007', price: 'SR 173', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&h=200&fit=crop' },
    { id: 9, name: 'Cookie-hbd-010', price: 'SR 173', image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=200&h=200&fit=crop' },
    { id: 10, name: 'Cookie-hbd-022', price: 'SR 173.8999', image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=200&h=200&fit=crop' },
  ];

  const mainProductImage = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop';

  const tabContent = {
    description: '12-inch Original Chocolate Cookie Cake. Made with premium chocolate and fresh ingredients. Perfect for celebrations and special occasions.',
    calories: 'Per serving: 350 calories | 15g fat | 45g carbs | 5g protein',
    alergens: 'Contains: Wheat, Milk, Eggs, Soy. May contain traces of nuts.'
  };

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const handleAddToCart = (productName, qty = quantity) => {
    setToastMessage(`${productName} - Quantity: ${qty} added to cart!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f5f5f5', marginTop: '134px' }}>
      {/* Toast Notification */}
      {showToast && (
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1050 }}>
          <div className="toast show align-items-center text-white bg-success border-0" role="alert">
            <div className="d-flex">
              <div className="toast-body">{toastMessage}</div>
              <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setShowToast(false)}></button>
            </div>
          </div>
        </div>
      )}

      <div className="container py-4">
        {/* Product Row - Exactly like screenshot */}
        <div className="row g-4">
          {/* Left Column - Main Image */}
          <div className="col-md-6">
            <div className="bg-white border rounded-4 p-3" style={{ borderRadius: '20px !important' }}>
              <img 
                src={mainProductImage}
                alt="Chocolate Cookie Cake"
                className="w-100 rounded-4"
                style={{ height: '400px', objectFit: 'cover' }}
              />
            </div>
            
            {/* Thumbnails - Small images */}
            <div className="d-flex gap-2 mt-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white border rounded-3" style={{ width: '80px', height: '80px', overflow: 'hidden' }}>
                  <img 
                    src={`https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&h=100&fit=crop&sig=${item}`}
                    alt="thumbnail"
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="col-md-6">
            <h1 className="fw-normal mb-2" style={{ fontSize: '32px' }}>We dream and achieve cookie cake</h1>
            <p className="text-secondary mb-3">12-inch Original Chocolate Cookie Cake.</p>
            
            {/* Price */}
            <div className="h2 fw-semibold mb-4">
              173.00 <span className="text-secondary small fw-normal">SR</span>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
              <div className="d-flex align-items-center border rounded-3 bg-white">
                <button onClick={decreaseQty} className="btn btn-light border-0 px-3 py-2">
                  <i className="bi bi-dash"></i>
                </button>
                <span className="px-3">{quantity}</span>
                <button onClick={increaseQty} className="btn btn-light border-0 px-3 py-2">
                  <i className="bi bi-plus"></i>
                </button>
              </div>
              <button 
                className="btn text-white px-5 py-2" 
                style={{ backgroundColor: '#212529', borderRadius: '8px' }}
                onClick={() => handleAddToCart('We dream and achieve cookie cake')}
              >
                Add to Cart
              </button>
            </div>

            {/* Tabs - Exactly like screenshot */}
            <div className="d-flex gap-4 mt-5 pt-2 border-bottom pb-2">
              <span 
                className={`${activeTab === 'description' ? 'fw-semibold text-dark border-bottom border-dark border-2 pb-2' : 'text-secondary'}`}
                onClick={() => setActiveTab('description')}
                style={{ cursor: 'pointer' }}
              >
                Description
              </span>
              <span 
                className={`${activeTab === 'calories' ? 'fw-semibold text-dark border-bottom border-dark border-2 pb-2' : 'text-secondary'}`}
                onClick={() => setActiveTab('calories')}
                style={{ cursor: 'pointer' }}
              >
                Calories
              </span>
              <span 
                className={`${activeTab === 'alergens' ? 'fw-semibold text-dark border-bottom border-dark border-2 pb-2' : 'text-secondary'}`}
                onClick={() => setActiveTab('alergens')}
                style={{ cursor: 'pointer' }}
              >
                Alergens
              </span>
            </div>
            
            {/* Tab Content */}
            <div className="mt-3 text-secondary">
              {tabContent[activeTab]}
            </div>
          </div>
        </div>

        {/* You May Also Like - Exactly like screenshot with images */}
        <div className="mt-5 pt-3">
          <h3 className="h5 fw-semibold mb-4">You may also like</h3>
          
          <div className="row g-3">
            {relatedProducts.map((product) => (
              <div key={product.id} className="col-6 col-md-3 col-lg-2">
                <div 
                  className="bg-white border rounded-4 p-3 text-center"
                  onClick={() => handleAddToCart(product.name, 1)}
                  style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="rounded-3 mb-2 w-100"
                    style={{ height: '100px', objectFit: 'cover' }}
                  />
                  <div className="small fw-bold">{product.name}</div>
                  <div className="text-secondary small">{product.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .border-bottom.border-dark.border-2 {
          border-bottom: 2px solid #212529 !important;
        }
      `}</style>
    </div>
  );
}