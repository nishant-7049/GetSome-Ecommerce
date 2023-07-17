import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component = Component, ...rest }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      {!loading && (
        <Route
          {...rest}
          render={(props) => {
            if (!isAuthenticated) {
              return <Redirect to="/login" />;
            }
            return <component {...props} />;
          }}
        />
      )}
    </>
  );
};

export default ProtectedRoute;
