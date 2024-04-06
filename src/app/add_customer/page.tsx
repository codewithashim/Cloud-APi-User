"use client";
import React, { useState } from "react";
import ProtectedRoute from "../protected/page";
import axios from "axios";
import Swal from "sweetalert2";

const AddCustomer = () => {
  const [customerName, setCustomerName] = useState("");
  const [cityName, setCityName] = useState("");
  const [phone, setPhone] = useState("");

  const handleFormSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const customerData = {
        name: customerName,
        city: cityName,
        phone: phone,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASED_URL}/customer`,
        customerData
      );

      console.log(response, "response");
      // Show success message with SweetAlert
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Customer added successfully",
      });

      // Clear form fields after successful submission
      setCustomerName("");
      setCityName("");
      setPhone("");
    } catch (error) {
      console.error("Error adding customer:", error);

      // Show error message with SweetAlert
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to add customer",
        footer: "Please try again later",
      });
    }
  };

  return (
    <ProtectedRoute>
      <div>
        <h2 className="text-2xl py-2">Add Customer</h2>

        <form
          onSubmit={handleFormSubmit}
          className="border p-4 mx-auto rounded flex flex-col gap-4 w-[60%]"
        >
          <div className="flex gap-2 w-full">
            <label htmlFor="customerName">Customer Name:</label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              className="border p-1 w-full"
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="cityName">City:</label>
            <input
              type="text"
              id="cityName"
              value={cityName}
              className="border p-1 w-full"
              onChange={(e) => setCityName(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              value={phone}
               className='border p-1 w-full'
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="bg-blue-400 px-2 py-2 rounded ">Add Customer</button>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default AddCustomer;
