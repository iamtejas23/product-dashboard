import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBox, FaSignOutAlt, FaBars, FaSun, FaMoon, FaUserCog, FaChartBar, FaShoppingCart, FaStore } from 'react-icons/fa';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <FaHome /> },
    { name: 'Products', path: '/products', icon: <FaBox /> },
    { name: 'Orders', path: '/orders', icon: <FaShoppingCart /> },
    { name: 'Sales', path: '/sales', icon: <FaChartBar /> },
    { name: 'Store Settings', path: '/store-settings', icon: <FaStore /> },
    { name: 'Profile', path: '/profile', icon: <FaUserCog /> },
    { name: 'Logout', path: '/logout', icon: <FaSignOutAlt /> },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-full transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} bg-gray-800 text-white shadow-lg flex flex-col justify-between`}
    >
      <div>
        <div className="flex items-center justify-between p-4">
          {!isCollapsed && <h1 className="text-2xl font-bold">Dashboard</h1>}
          <button
            onClick={toggleSidebar}
            className="p-2 text-gray-300 hover:bg-gray-700 rounded"
          >
            <FaBars size={20} />
          </button>
        </div>

        <nav>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-4 py-2 px-4 transition-colors ${
                location.pathname === item.path ? 'bg-blue-500' : 'hover:bg-gray-700'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4">
        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-2 p-2 bg-gray-700 hover:bg-gray-600 rounded text-sm"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
          {!isCollapsed && <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
      </div>
    </aside>
  );
}
