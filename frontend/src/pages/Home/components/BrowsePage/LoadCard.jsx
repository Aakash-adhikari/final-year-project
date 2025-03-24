import React from 'react';
import { FaEye } from 'react-icons/fa';

const LoadCard = ({ load }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <img
        src={load.image}
        alt={load.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800">{load.title}</h3>
      <p className="text-gray-600 mt-2">{load.description}</p>
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Load Type:</span>
          <span>{load.loadType}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Weight:</span>
          <span>{load.weight} kg</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Pickup:</span>
          <span>{load.pickupLocation}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Destination:</span>
          <span>{load.destination}</span>
        </div>
      </div>
      <div className="mt-4">
      <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold w-full text-center hover:bg-blue-700"
            onClick={() => alert(`Viewing details for load #${load.id}`)} // This could link to a detailed page
          >
            View Details <FaEye className="inline ml-2" />
          </button>
        </div>
      </div>
    );
};

export default LoadCard;

