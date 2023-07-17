import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotAuth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/signUp");
  }, [navigate]);

  return <div>NotAuth</div>;
};

export default NotAuth;
