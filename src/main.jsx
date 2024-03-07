import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/pages/errorPage/ErrorPage.jsx";
import Home from "./components/pages/home/Home.jsx";
import SignUp from "./components/pages/sign/SignUp.jsx";
import AuthProvider from "./components/provider/AuthProvider.jsx";
import SignIn from "./components/pages/sign/SignIn.jsx";
import AllCourses from "./components/pages/courses/AllCourses.jsx";
import Courses from "./components/pages/courses/Courses.jsx";
import DetailsPage from "./components/pages/details/DetailsPage.jsx";
import Dashboard from "./components/pages/dashboard/Dashboard.jsx";
import AddCourse from "./components/pages/addCourse/AddCourse.jsx";
import Reviewer from "./components/pages/review/Reviewer.jsx";
import UpdatePage from "./components/pages/updatePage/UpdatePage.jsx";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/signIn",
        element: <SignIn />,
      },
      {
        path: "/allCourse",
        element: <AllCourses />,
        children: [
          {
            path: "/allCourse/:id",
            element: <Courses />
          }
        ]
      },
      {
        path: "/courseDetails/:id",
        element: <DetailsPage />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/addCourse",
        element: <AddCourse />
      },
      {
        path: "/reviewerPage/:id",
        element: <Reviewer />
      },
      {
        path: "/update/:id",
        element: <UpdatePage />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
