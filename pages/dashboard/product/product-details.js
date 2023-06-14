import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ImageSlider from "@/Components/product/ImageSlider";
import { AiFillStar } from "react-icons/ai";
import Reviews from "@/Components/Cart/Reviews";
import { TbMathGreater } from "react-icons/tb";
import Layout from "@/Components/Layout";
import PaymentOptions from "@/Components/product/PaymentOptions";
import { BsCashCoin, BsAirplane } from "react-icons/bs";
import { TbReplace } from "react-icons/tb";
import axios from "axios";
import Link from "next/link";
import {BsCurrencyRupee } from "react-icons/bs";
import { RiLoaderFill } from "react-icons/ri"; 
import MultiStepForm from "@/Components/Form";
export default function ResetPasswordPage() {
  const router = useRouter();
  const [produc ,setProduct]=useState()
  const [img,setImg]=useState([])
 const [loader,setLoader]=useState(true)

  const { product_id } = router.query;
  const getDetails = async () => {

    if (!product_id){
      return;
    }

    console.log(product_id)
    const token = localStorage.getItem("tmToken");
    console.log(product_id)
    if (token) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          },
        };
        const response = await axios.get(
          "https://admin.tradingmaterials.com/api/get/products-details",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              product_id:product_id
            },
          }
        );

        if (response.data.status) {
setProduct(response.data.data.product)
setImg([response.data.data.files[3],response.data.data.files[1],response.data.data.files[2]])

console.log(produc  ,img)
        }
      } catch (error) {
        console.error("Error fetching user info:", error)
      }
    }
  };
  useEffect(() => {

    const fetchData = async () => {
      await getDetails();
    };
  
    fetchData();


  }, [router.query]);




  const [activeButton, setActiveButton] = useState("description");

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  const [quantity, setQuantity] = useState(1);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const addToCart = async () => {
    const token = localStorage.getItem("tmToken");
    setLoader(false)
    if (token) {
      try {
        const config = {
          headers: {
            Authorization:`Bearer ${token}`,
          },
        };
        const response = await axios.post(
          "https://admin.tradingmaterials.com/api/product/add-to-cart",
          {
              product_id:product_id,
              qty: quantity,
          
          },
          config
        );

        if (response.data.status) {
          console.log(response);
          setLoader(true)
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }
  };
  const data = [
    { label: "Brand", value: "Example Brand" },
    { label: "Model", value: "Example Model" },
    { label: "Color", value: "Red" },
    { label: "Material", value: "Steel" },
    { label: "Weight", value: "1.5 kg" },
  ];
  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const images = [
    "https://img.tatacliq.com/images/i11/437Wx649H/MP000000017544739_437Wx649H_202305151039072.jpeg",
    "https://img.tatacliq.com/images/i11/437Wx649H/MP000000017544736_437Wx649H_202305151039022.jpeg",
    "https://img.tatacliq.com/images/i10/437Wx649H/MP000000017298492_437Wx649H_202304202104192.jpeg",
  ];

  

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center ">
        <div className="container mx-auto px-4 py-8">
          <div className="p-8 flex items-center font-semibold">
            Home <TbMathGreater className="mt-[3px]" />
            <Link href="/product/category">Category</Link>
            <TbMathGreater className="mt-[3px]" /> {produc?.name}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 ">
            <div className=" flex justify-end md:w-[60%] m-auto">
              <ImageSlider images={img} />
            </div>
            <div className=" flex justify-start flex-col">
              <h1 className="text-2xl font-bold mb-4">{produc?.name}</h1>
              <div className="flex gap-2 items-center p-1">        
                <div className="flex items-center ">
                  {[...Array(4)].map((_, index) => (
                    <AiFillStar style={{ color: "gold" }} key={index} />
                  ))}
                </div>
                <div className="flex items-center font-medium">
                  20 Customer Reviews
                </div>
              </div>
              <div className="flex items-center gap-2 ">
                <p className="text-lg font-bold mb-1 text-gray-400 line-through">
                  {produc?.price}
                </p>
                <p className="text-2xl font-bold mb-1 flex items-center"><BsCurrencyRupee/> {produc?.prices[0].INR}</p>
              </div>
              <p className="text-gray-600 mb-4 font-medium">
          
              </p>

              <div>
                <div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:produc?.description,
                    }}     suppressHydrationWarning={true}
                  />
                </div>
                <div></div>
                <div></div>
              </div>

              <div className="border-2 p-4 rounded-lg  w-fit">
                <div className="flex flex-col">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center">
                      <BsCashCoin className="text-2xl mr-2 text-green-600" />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-bold text-sm">Cash on Delivery</p>
                      <p className="text-xs">
                        Cash on Delivery Available in India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 gap-6">
                    <div className="flex ">
                      <TbReplace className="text-2xl mr-2 text-blue-500" />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-bold text-sm">
                        7 Day Free Replacement
                      </p>
                      <p className="text-xs">
                        Replace your item within 7 days.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 gap-6">
                    <div className="flex ">
                      <BsAirplane className="text-2xl mr-2 text-red-500" />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-bold text-sm">Fast/Free Shipping</p>
                      <p className="text-xs">
                        All orders are shipped free within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <PaymentOptions />
              <hr />
              <div className="flex items-center gap-2 mt-4">
                <div className="flex items-center gap-2">
                  <button
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded"
                    onClick={handleDecreaseQuantity}
                  >
                    -
                  </button>
                  <p className="text-xl font-semibold">{quantity}</p>
                  <button
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded"
                    onClick={handleIncreaseQuantity}
                  >
                    +
                  </button>
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={addToCart}>
              {loader?" Add to Cart": (
                  <RiLoaderFill size="20px" className="rotate" />
                )}
                </button>
                <button className="bg-blue-500 text-white py-2 px-4  rounded">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
          <hr className="my-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 my-8 ">
            <div className=" flex justify-end md:w-[60%] m-auto">
              <div className="video-container rounded-sm  ">
                <video
                  controls
                  className="video rounded-md w-[90vw] md:w-[80vw] lg:w-[40vw]"
                >
                  <source
                    src="https://encrypted-vtbn0.gstatic.com/video?q=tbn:ANd9GcS0WwcoS0cHitzAMTzrYfm-S5JhCHfFYJ8EFw"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
          </div>

          <div className="flex space-x-4  border-b mt-2">
            <button
              className={`${
                activeButton === "description"
                  ? "border-blue-500 border-b-2"
                  : ""
              } py-2 px-4   transition-colors duration-300`}
              onClick={() => handleClick("description")}
            >
              Description
            </button>
            <button
              className={`${
                activeButton === "reviews" ? "border-blue-500 border-b-2" : ""
              } py-2 px-4   transition-colors duration-300`}
              onClick={() => handleClick("reviews")}
            >
              Reviews
            </button>
            <button
              className={`${
                activeButton === "additional"
                  ? " border-blue-500 border-b-2"
                  : " "
              } py-2 px-4   transition-colors duration-300`}
              onClick={() => handleClick("additional")}
            >
              Additional Information
            </button>
          </div>

          {activeButton === "description" && <div>jlklhlkl</div>}

          {activeButton === "reviews" && (
            <div>
              <Reviews />
            </div>
          )}

          {activeButton === "additional" && (
            <div>
              <div className="bg-white shadow-lg rounded-md p-6">
                <h2 className="text-2xl font-bold mb-4">
                  Additional Information
                </h2>
                <table className="w-full">
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.label} className="border-b">
                        <td className="py-2 pr-4 font-bold">{item.label}</td>
                        <td className="py-2">{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
