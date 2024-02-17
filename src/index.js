import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from "./pages/home/Home";
import StudentsList from "./pages/students/StudentsList";
import CoursesList from "./pages/courses/CoursesList";
import ResultsList from "./pages/results/ResultsList";
import App from './App';
import reportWebVitals from './reportWebVitals';

// Routes
import { createBrowserRouter , RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/students_list",
    element: <StudentsList />,
  },
  {
    path: "/courses_list",
    element: <CoursesList />,
  },
  {
    path: "/results_list",
    element: <ResultsList />,
  },
  /*{
    path: "/pred",
    element: <Pred />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },*/
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <RouterProvider router = {router} />
    <Footer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
