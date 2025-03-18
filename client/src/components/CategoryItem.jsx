/**
 * @module CategoryItem.jsx
 * @description Component for home page category
 */

import { Link } from 'react-router-dom';

function CategoryItem({ category }) {
  return (
    <div className="relative overflow-hidden h-95 w-full rounded-lg group shadow-xl shadow-cyan-500/50 ring-2 ring-cyan-500/50">
      <Link to={'/category' + category.href}>
        <div className="w-full h-full cursor-pointer">
          <div className="absolute inset-0 hover:bg-gradient-to-b from-transparent to-gray-900 opacity-50 z-10"></div>
          <img
            src={category.img}
            alt={category.name}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <h3 className="text-2xl font-bold font-audiowide mb-1">{category.name}</h3>
            <p className="text-gray-200">Enter {category.name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CategoryItem;
