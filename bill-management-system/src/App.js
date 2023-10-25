import './App.css';
import AddProduct from './Component/AddProduct';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './Component/Registration';
import Navbar from './Navbar';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import ShowProduct from './Component/ShowProduct';
import UpdateProductDetail from './Component/UpdateProductDetail';

function App() {
  return (
    <div className="App">
      <h1>Bill Management System</h1>
      <NotificationContainer />
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/showproduct" element={<ShowProduct />} />
        <Route path="/updateproductdetail/:itemName" element={<UpdateProductDetail />} />
      </Routes>
      </BrowserRouter>

      </div>
  );
}

export default App;
