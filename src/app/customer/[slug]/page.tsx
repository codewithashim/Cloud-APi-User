"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import ProtectedRoute from "@/app/protected/page";
 
const CoustomerDetais = ({ params }: { params: { slug: any } }) => {
  const decodedSlug = decodeURIComponent(params.slug);

  const [CustomerData, setCustomerData] = useState<any>();
  const [Temperature, setTemperature] = useState<any>();

  console.log(decodedSlug)

  useEffect(() => {
    const CustomerData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASED_URL}/customer?query=${decodedSlug}`);
        console.log(response, "response");
        const data = response.data;
        setCustomerData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    CustomerData();
  }, [decodedSlug]);

  useEffect(() => {
    const GetWatherData = async () => {
      try {
        const API_KEY = "cf406ce13c9549186e012b2fa5214f5d";
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${CustomerData?.city}&appid=${API_KEY}&units=metric`
        );
        console.log(response, "response");
        const temperature = response.data.main.temp;
        setTemperature(temperature);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    GetWatherData();
  }, [CustomerData?.city]);

  return (
    // <ProtectedRoute>
      <div className="border shadow p-4 rounded flex flex-col gap-2 my-6">
        <h1>Name : {CustomerData?.name}</h1>
        <h1>Phone : {CustomerData?.phone}</h1>
        <h1>City : {CustomerData?.city}</h1>
        <h1>Today Temperature : {Temperature} </h1>
      </div>
    // </ProtectedRoute>
  );
};

export default CoustomerDetais;
