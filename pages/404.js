// pages/404.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const NotFoundPage = () => {
  const router = useRouter();

  useEffect(() => {

const check=async()=>{
    const token = localStorage.getItem("tmToken");
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
              router.push("/dashboard");
          }
        } catch (error) {
          // Handle error
          console.error("Error fetching user info:", error);
          localStorage.removeItem("tmToken");
          router.push("/login");
        }
      }
   if(!token){
    router.push("/login");
   }
}
check()
  }, []);

  return (
    <div>
      <h1>Page Not Found</h1>
      <p>Redirecting to login page...</p>
    </div>
  );
};

export default NotFoundPage;
