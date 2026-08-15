import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Products from './pages/Products';
import Machines from './pages/Machines';
import Lines from './pages/Lines';
import Shifts from './pages/Shifts';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
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
    </Routes>
  );
}

export default App;