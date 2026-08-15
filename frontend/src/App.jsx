import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Products from './pages/Products';
import Machines from './pages/Machines';
import Lines from './pages/Lines';
import Shifts from './pages/Shifts';
import ProductionOrders from './pages/ProductionOrders';
import ProductionEntry from './pages/ProductionEntry';
import Downtime from './pages/Downtime';
import Quality from './pages/Quality';
import Landing from './pages/Landing';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
      <Route path="/machines" element={<PrivateRoute><Machines /></PrivateRoute>} />
      <Route path="/lines" element={<PrivateRoute><Lines /></PrivateRoute>} />
      <Route path="/shifts" element={<PrivateRoute><Shifts /></PrivateRoute>} />
      <Route path="/orders" element={<PrivateRoute><ProductionOrders /></PrivateRoute>} />
      <Route path="/entry" element={<PrivateRoute><ProductionEntry /></PrivateRoute>} />
      <Route path="/downtime" element={<PrivateRoute><Downtime /></PrivateRoute>} />
      <Route path="/quality" element={<PrivateRoute><Quality /></PrivateRoute>} />
    </Routes>
  );
}

export default App;