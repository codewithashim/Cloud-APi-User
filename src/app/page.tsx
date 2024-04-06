"use client";
import axios from "axios";
import Link from "next/link";
import { SetStateAction, useEffect, useState } from "react";

export default function Home() {
  const [customerData, setCustomerData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/customer");
        console.log(response, "response");
        setCustomerData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearchQuery(event.target.value);
  };

  const filteredCustomerData = customerData.filter((customer: any) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Now ..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="px-3 py-2 border rounded-md w-[80%]"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {filteredCustomerData.map((customer : any) => (
          <div className="border shadow p-4 rounded flex flex-col gap-2" key={customer.id}>
            <Link href={`/customer/${customer.id}`}>Name : {customer.name}</Link>
            <h1>Phone : {customer.phone}</h1>
            <h1>City : {customer.city}</h1>
          </div>
        ))}
      </div>
    </section>
  );
}
