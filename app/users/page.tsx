"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [users, setUsers] = useState<any>([] || undefined);

  useEffect(() => {
    let data = axios.get("http://localhost:3000/api/users");
    data
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h4 className="text-xl font-semibold mb-4 text-center">Danh sách user</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left">STT</th>
              <th className="px-6 py-3 text-left">Name</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: any, index: number) => (
              <tr key={user.id} className="even:bg-gray-100 odd:bg-white">
                <td className="px-6 py-4 border-b">{index + 1}</td>
                <td className="px-6 py-4 border-b">{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
