import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function ResetPasswordPage({ isLinkExpired,hash }) {
  const router = useRouter();
  // const { resetcode } = router.query;
  useEffect(() => {
    sessionStorage.setItem("resetEmailPasswordHash", hash);
    if (isLinkExpired) {
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else {
      router.push("/reset-password/change");
    }
  }, [isLinkExpired, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        {isLinkExpired ? (
          <p>
            <Link href="/resetpassword">Link expired.</Link>
          </p>
        ) : (
          <p>Redirecting...</p>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { resetcode } = context.query;
console.warn(resetcode)
  try {
    const response = await axios.post(
      "https://admin.tradingmaterials.com/api/verify/hash",
      { hash: resetcode }
    );
    const { status, data } = response.data;
    // sessionStorage.setItem("resetEmailPasswordHash", data.hash);

    return {
      props: {
        isLinkExpired:!status,
        hash:data.hash
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        isLinkExpired: true,
        hash:false
      },
    };
  }
}
