import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
 Route,
 Routes,
} from "react-router-dom";
import Login from './pages/login/Login';
import AuthLayout from './components/layouts/AuthLayout';
import AppLayout from './components/layouts/AppLayout';
import RouteGuard from './components/routes/RouteGuard';
import TagList from './pages/tag/TagList';


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route element={<RouteGuard/>}>
          <Route path='/' element={<AppLayout></AppLayout>}></Route>
          <Route path='/tag' element={<AppLayout title='Tag'><TagList></TagList></AppLayout>}></Route>
      </Route>
      <Route path='/login' element={<AuthLayout><Login></Login></AuthLayout>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
