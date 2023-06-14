import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = (WrappedComponent) => {
  const WithProtection = (props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const checkAuthentication = async () => {
      const token = localStorage.getItem("tmToken");
      if (
        !token &&
        (router.pathname === "/" || router.pathname.includes("/dashboard"))
      ) {
        router.push("/login");
        return;
      }

      if (
        router.pathname === "/" ||
        router.pathname.includes("/dashboard") ||
        router.pathname === "/login"
      ) {
        // Send GET request to get user info
        if (token) {
          try {
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };

            const response = await axios.get(
              "https://admin.tradingmaterials.com/api/get-user-info",
              config
            );

            if (response.data.status) {
              setIsAuthenticated(true);
              console.log(response);
              if (router.pathname === "/" || router.pathname === "/login") {
                router.push("/dashboard");
              }
            }
          } catch (error) {
            // Handle error
            console.error("Error fetching user info:", error);
            localStorage.removeItem("tmToken");
            router.push("/login");
          }
        }
      }

      setIsLoading(false); // Set loading state to false once the authentication check is completed
    };

    useEffect(() => {
      const token = localStorage.getItem("tmToken");
      if (!token) {
        router.push("/login");
      }
      checkAuthentication();
    }, []);

    // Render the loading page if still loading or if not authenticated

    // Render the wrapped component if not loading and authenticated
    return <WrappedComponent {...props} />;
  };

  return WithProtection;
};

export default ProtectedRoute;
