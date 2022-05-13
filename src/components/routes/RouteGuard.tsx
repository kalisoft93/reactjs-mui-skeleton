import React from 'react';
import {
    Navigate,
    Outlet
} from "react-router-dom";
import storageService, { Locals } from '../../utils/storageService';


const RouteGuard = () => {
      const isAuthenticated = !!storageService.getItem(Locals.ACCESS_TOKEN);
      return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} replace />; // or loading indicator, etc...
  };

export default RouteGuard;