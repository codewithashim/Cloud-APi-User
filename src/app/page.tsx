"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [CustomerData, setCustomerData] = useState();

  useEffect(() => {
    const CustomerData = async () => {
      try {
        const response = await axios.get("/api/customer");
        console.log(response, "response");
        const data = response.data;
        setCustomerData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    CustomerData();
  }, []);

  return (
    <section className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {CustomerData?.map((customer: any) => {
          return (
            <div className="border shadow p-4 rounded flex flex-col gap-2" key={customer?.id}>
              <Link href={`/customer/${customer?.id}`}>Name : {customer?.name}</Link>
              <h1>Phone : {customer?.phone}</h1>
              <h1>City : {customer?.city}</h1>
            </div>
          );
        })}
      </div>
    </section>
  );
}
