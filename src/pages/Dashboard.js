import { useState } from 'react';
import { ProductData } from '../context/ProductContext';
import { LoadingBig } from '../component/Loading.js';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../context/UserContext.js';

const Dashboard = () => {
  const navigate = useNavigate();
  const { data } = UserData();
  const { total, pagination ,products, loading, setEditProductState, deleteProduct } = ProductData(); 

  const handleEdit = (product) => {
    setEditProductState(product);
    navigate('/edit');
  };

  const handleAddItem = () => {
    navigate('/add'); 
  };

  const handleDelete = (product) => {

    const sure = window.confirm('Are you sure you want to delete this product');
    if(sure)
    deleteProduct(product._id);
    setEditProductState(null); 
    
  }

  const handlePage = (page) => {
    pagination(page); 
  };

  return (
    <div>{
      data?
    <div>
      <div className="w-full sm:w-[540px] md:w-[720px] lg:w-[1170px] mx-auto p-4">
      <button
          onClick={handleAddItem}
          className="bg-green-500 text-white text-sm px-4 py-2 rounded mb-4 hover:bg-green-600 transition duration-300"
        >
          Add Item
        </button>
        <div className="flex flex-wrap -m-2">
          {loading ? (
            <LoadingBig />
          ) : products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="w-1/2 sm:w-1/3 md:w-1/4 p-2">
                <div className="product-card relative border rounded-lg p-4 shadow hover:shadow-lg transition duration-300">
                  <button
                    className="absolute top-2 right-2 bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600 transition duration-300"
                    onClick={() => handleEdit(product)} 
                  >
                    Edit
                  </button>

                  <button
                    className="absolute top-2 left-2 bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600 transition duration-300"
                    onClick={() => handleDelete(product)} 
                  >
                    Delete
                  </button>

                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-64 object-cover rounded-md"
                  />
                  <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
                  <p className="text-gray-600 text-sm mt-1 h-[60px] overflow-hidden">
                    {product.description}
                  </p>
                  <div className="flex gap-4 justify-evenly items-center leading-none">
                    <p className="text-green-500 font-bold">
                      ₹{(
                        product.price - (product.price * product.discountPercentage) / 100
                      ).toFixed(2)}{' '}
                      <span className="line-through text-gray-500 text-sm">
                        ₹{product.price.toFixed(2)}
                      </span>
                    </p>
                    <p className="text-yellow-500 text-sm">Rating: {product.rating}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-full">No products available</p>
          )}
        </div>
        
        
        {/* Pagination Section */}
        {!loading && products.length > 0 && (
          <div className="pagination mt-4 text-center">
            {Array(Math.ceil(total / 12)) 
              .fill(0)
              .map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePage(i + 1)}
                  className="mx-1 px-3 py-1 border rounded hover:bg-blue-500 hover:text-white"
                >
                  {i + 1}
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
    : <p>You are not authorized to view this page</p>}
    </div>
  );
};

export default Dashboard;