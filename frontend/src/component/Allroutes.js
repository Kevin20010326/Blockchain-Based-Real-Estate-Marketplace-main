import React from "react";
import { Routes, Route } from "react-router-dom";
import { Sell } from "../pages/Sell";
import { Buy } from "../pages/Buy";
import { Home } from "../pages/Home";
import { UserProfile } from "../pages/UserProfile";
import { PropertyDetails } from "../pages/PropertyDetails";

export const Allroutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/buy/:tokenID" element={<PropertyDetails />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
    </div>
  );
};
