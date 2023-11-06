import "./App.scss";
import { Provider, useDispatch, useSelector } from "react-redux";
import BusinessLayout from "./layouts/businessLayout/BusinessLayout";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { authRoutes, businessRoutes, passopRoutes } from "./routes/Routes";
import { useEffect } from "react";
import { setAllTags } from "./redux/slices/tagsSlice";
import getAllTags from "./apis/common/getAllTags";
import LayoutAlternator from "./layouts/LayoutAlternator/LayoutAlternator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signin from "./pages/Authentication/Signin/Signin";
import { clearProfileData } from "./redux/slices/profileDataSlice";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchAllTags = async () => {
    const data = await getAllTags();
    dispatch(setAllTags(data));
  };
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (!localStorage.getItem("tags")) {
      fetchAllTags();
    }
    return () => {
      localStorage.removeItem("tags");
    };
  }, []);

  const ProtectedRoute = ({ children, redirectTo }) => {
    if (isLoggedIn) {
      return children;
    } else {
      navigate(redirectTo);
    }
  };

  useEffect(() => {
    if (!location.pathname.includes("addBusiness")) {
      dispatch(clearProfileData())
    }
    if (location.pathname === "/" && !isLoggedIn) {
      navigate("/signin");
    }
  }, [location]);
  
  return (
    <div className="App">
      <ToastContainer />
      <LayoutAlternator>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          {businessRoutes.map((route, index) => (
            <Route
              key={index}
              path={`${route.path}`}
              element={
                <ProtectedRoute redirectTo={"/signin"}>
                  {route.element}
                </ProtectedRoute>
              }
            />
          ))}
          {authRoutes.map((route, index) => (
            <Route key={index} path={`${route.path}`} element={route.element} />
          ))}
          {passopRoutes.map((route, index) => (
            <Route key={index} path={`${route.path}`} element={route.element} />
          ))}
        </Routes>
      </LayoutAlternator>
    </div>
  );
}

export default App;
