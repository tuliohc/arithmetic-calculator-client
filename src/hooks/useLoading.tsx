import { useContext } from "react";
import { LoadingContext } from "../contexts/LoadingProvider";

const useLoading = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider.");
  }

  return context;
};

export default useLoading;