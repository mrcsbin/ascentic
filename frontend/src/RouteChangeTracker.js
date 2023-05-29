import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";
import { gaTrackingID } from "./config";

const RouteChangeTracker = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize(gaTrackingID);
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  return null;
};

export default RouteChangeTracker;
