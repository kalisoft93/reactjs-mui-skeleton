import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import AppRoute from './components/routes/AppRoute';
import Login from './pages/login/Login';
import AuthLayout from './components/layouts/AuthLayout';
import Header from './components/header/Header';
import AppLayout from './components/layouts/AppLayout';

function App() {

  return (
    <Router>
      <Switch>
        <AppRoute exact path="/" component={Header} layout={AppLayout} protectedRoute={true}></AppRoute>
        <AppRoute exact path="/login" component={Login} layout={AuthLayout} protectedRoute={false}></AppRoute>
      </Switch>
    </Router>
  );
}

export default App;
