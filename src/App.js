import LoginPage from "./Pages/LoginPage";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomeRoutes from "./Routes/HomeRoutes";
import api from "./apis/AxiosConfigs";
import Loader from "./Components/Loader";
import { useEffect, useState } from "react";

const App = () => {
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);
  api.interceptors.request.use((request) => {
    setLoading(true);
    return request;
  });

  api.interceptors.response.use(
    (response) => {
      console.log(response);
      setLoading(false);
      return response;
    },
    (error) => {
      setLoading(false);
      return error;
    }
  );

  return (
    <>
      <div>
        {loading && <Loader />}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/mainHome/*" element={<HomeRoutes />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
