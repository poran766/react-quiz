// import { Navigate, Route } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// // eslint-disable-next-line react/prop-types
// export default function PrivateRoute({ component: Component, ...rest }) {
//   const { currentUser } = useAuth();
//   return currentUser ? <Route {...rest}>{(props) => <Component {...props} />}</Route> : <Route path="/login" element={<Navigate to="/Login" />}></Route>;
// }


import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}
