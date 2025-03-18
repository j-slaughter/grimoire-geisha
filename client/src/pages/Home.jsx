/**
 * @module Home.jsx
 * @description Renders Home page
 */

import CategoryItem from '../components/CategoryItem.jsx';

const categories = [
  { name: 'Pants', href: '/pants', img: '/pants.png' },
  { name: 'Tops', href: '/tops', img: '/tops.png' },
  { name: 'Shoes', href: '/shoes', img: '/shoes.png' },
  { name: 'Jackets', href: '/jackets', img: '/jackets.png' },
  { name: 'Glasses', href: '/glasses', img: '/glasses.png' },
  { name: 'Prints', href: '/prints', img: '/prints.png' },
  { name: 'Gamer Gear', href: '/gear', img: '/gear.png' },
];

function Home() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-45 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 font-audiowide mb-4 drop-shadow-lg animate-neonSign">
          Shop Our Categories
        </h1>
        <p className="text-center text-xl text-amber-600 font-semibold mb-12 drop-shadow-lg ">
          Discover wearable art that fuses gaming culture and Japanese animations
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
