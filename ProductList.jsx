import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.items);
  const totalItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?w=300", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572688484437-c81b3734b79b?w=300", description: "Filters formaldehyde and xylene.", cost: "$12" },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?w=300", description: "Removes mold spores and toxins.", cost: "$18" },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=300", description: "Adds humidity and purifies air.", cost: "$14" },
        { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1616690710400-a16d146927c5?w=300", description: "Tough foliage that cleans toxins.", cost: "$20" },
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=300", description: "Medicinal and air purifying.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=300", description: "Calming scent for relaxation.", cost: "$16" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729984859-9945037d6e42?w=300", description: "Sweet, enchanting fragrance.", cost: "$18" },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=300", description: "Aromatic culinary herb.", cost: "$14" },
        { name: "Mint", image: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=300", description: "Refreshing and lively aroma.", cost: "$8" },
        { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=300", description: "Crisp and invigorating fragrance.", cost: "$22" },
        { name: "Lemon Verbena", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=300", description: "Zesty, vibrant citrus fragrance.", cost: "$15" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=300", description: "Thrives in low light conditions.", cost: "$25" },
        { name: "Pothos", image: "https://images.unsplash.com/photo-1598880940371-c756e015fea1?w=300", description: "Tolerates neglect and irregular watering.", cost: "$11" },
        { name: "Cast Iron Plant", image: "https://images.unsplash.com/photo-1597055181300-e3633a917c9c?w=300", description: "Virtually indestructible greenery.", cost: "$24" },
        { name: "Jade Plant", image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=300", description: "Durable succulent symbolising prosperity.", cost: "$13" },
        { name: "Succulent Trio", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=300", description: "Requires minimal watering.", cost: "$15" },
        { name: "Chinese Evergreen", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=300", description: "Hardy with patterned leaves.", cost: "$19" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-brand" onClick={() => setShowCart(false)}>
          <h3>Paradise Nursery</h3>
        </div>
        <div className="nav-links">
          <span onClick={() => setShowCart(false)} className="nav-link">Plants</span>
          <span onClick={() => setShowCart(true)} className="nav-link cart-link">
            🛒 Cart ({totalItemsCount})
          </span>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((categoryObj, index) => (
            <div key={index} className="category-section">
              <h2 className="category-title">{categoryObj.category}</h2>
              <div className="plant-list">
                {categoryObj.plants.map((plant, pIndex) => (
                  <div key={pIndex} className="product-card">
                    <img src={plant.image} alt={plant.name} className="product-image" />
                    <h3 className="product-title">{plant.name}</h3>
                    <p className="product-description">{plant.description}</p>
                    <p className="product-price">{plant.cost}</p>
                    <button
                      className={`add-to-cart-btn ${addedToCart[plant.name] ? 'disabled' : ''}`}
                      disabled={addedToCart[plant.name]}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
