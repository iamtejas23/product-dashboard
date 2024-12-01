import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Sidebar from './components/Sidebar/Sidebar';
import Products from './pages/Products/Products';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Sidebar />
        <div className="ml-16 md:ml-64 p-4 flex-1">
          <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/products" element={<Products/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
