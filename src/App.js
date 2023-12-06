import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "./component/index";
import FormData from "./component/formData/newForm";
import UpdateForm from "./component/formData/updateForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/produk" />} />
        <Route path="/produk" element={<Index />} />
        <Route path="/produk/addData" element={<FormData />} />
        <Route path="/produk/:id/editData" element={<UpdateForm />} />
      </Routes>
    </>
  );
}

export default App;
