import Layout from "@/Components/Layout";
import React from "react";
import CourseCard from "@/Components/card/CourseCard";
function Recentorders() {
  const cardData = [
    {
      status: "In Progress",
      price: 49.99,
      productName: "Product 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://example.com/product1.jpg",
      orderId: "ABC123",
      orderedDate: "2023-05-24",
      address: "123 Main St, City, Country",
    },
    {
      status: "Completed",
      price: 79.99,
      productName: "Product 2",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://example.com/product2.jpg",
      orderId: "XYZ789",
      orderedDate: "2023-05-23",
      address: "456 Elm St, City, Country",
    },
    {
      status: "Completed",
      price: 79.99,
      productName: "Product 2",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://example.com/product2.jpg",
      orderId: "XYZ789",
      orderedDate: "2023-05-23",
      address: "456 Elm St, City, Country",
    },
    {
      status: "Completed",
      price: 79.99,
      productName: "Product 2",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://example.com/product2.jpg",
      orderId: "XYZ789",
      orderedDate: "2023-05-23",
      address: "456 Elm St, City, Country",
    },
    {
      status: "Completed",
      price: 79.99,
      productName: "Product 2",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://example.com/product2.jpg",
      orderId: "XYZ789",
      orderedDate: "2023-05-23",
      address: "456 Elm St, City, Country",
    },
    {
      status: "Completed",
      price: 79.99,
      productName: "Product 2",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://example.com/product2.jpg",
      orderId: "XYZ789",
      orderedDate: "2023-05-23",
      address: "456 Elm St, City, Country",
    },
    {
      status: "Completed",
      price: 79.99,
      productName: "Product 2",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://example.com/product2.jpg",
      orderId: "XYZ789",
      orderedDate: "2023-05-23",
      address: "456 Elm St, City, Country",
    },
  ];
  return (
    <div className="flex gap-0">
      <Layout>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 m-5">
          {cardData.map((card, index) => (
            <CourseCard key={index} {...card} />
          ))}
        </div>
      </Layout>
  
    </div>
  );
}

export default Recentorders;
