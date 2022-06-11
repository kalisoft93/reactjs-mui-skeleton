import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
 Navigate,
 Route,
 Routes,
 useNavigate,
} from "react-router-dom";
import Login from './pages/login/Login';
import AuthLayout from './components/layouts/AuthLayout';
import AppLayout from './components/layouts/AppLayout';
import RouteGuard from './components/routes/RouteGuard';
import TagList from './pages/tag/TagList';
import MediaList from './pages/media/MediaList';
import ProductList from 'pages/product/ProductList';
import Ability from 'pages/ability/Ability';
import useAuth from 'hooks/authentication/useAuth';
import { useEffect } from 'react';


function App() {

  const auth = useAuth();

  return (
    <Routes>
      <Route element={<RouteGuard/>}>
          <Route path='/' element={<AppLayout></AppLayout>}></Route>
          <Route path='/tag' element={<AppLayout title='Tag'><TagList></TagList></AppLayout>}></Route>
          <Route path='/media' element={<AppLayout title='Média'><MediaList></MediaList></AppLayout>}></Route>
          <Route path='/product' element={<AppLayout title='Termék'><ProductList></ProductList></AppLayout>}></Route>
          <Route path='/ability' element={<AppLayout title='Tematikus tevékenység'><Ability></Ability></AppLayout>}></Route>
      </Route>
      <Route path='/login' element={<AuthLayout><Login></Login></AuthLayout>}></Route>
    </Routes>
  );
}

export default App;
