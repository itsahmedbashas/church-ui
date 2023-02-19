import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLookupPage from "../Pages/AdminLookupPage/AdminLookupPage";
import HomePage from "../Pages/HomePage";
import ProjectAddEdit from "../Pages/Projects/ProjectAddEdit/ProjectAddEdit";
import Projects from "../Pages/Projects/Projects";

export default function HomeRoutes() {
  return (
    <Routes>
      <Route element={<HomePage />}>
        <Route index element={<Projects />} />
        <Route path="/proj" element={<Projects />} />
        <Route path="/admin/:id" element={<AdminLookupPage />} />
        <Route path="/project/:id?" element={<ProjectAddEdit />} />
      </Route>
    </Routes>
  );
}
