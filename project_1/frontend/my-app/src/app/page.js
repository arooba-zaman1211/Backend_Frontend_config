"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [data, setdata] = useState({
    name: "",
    email: "",
    input: "",
  });
  const [tabledata, settable] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [update, setupdate] = useState({
    input: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3001/api/getmessages");
      console.log(response.data);
      settable(response.data.data);
    };
    fetchData();
  }, []);

  const handlSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.input) {
      return;
    }
    try {
      if (editingId) {
        console.log(editingId);
        console.log(data.name);
        console.log(data.email);
        console.log(data.input);
        console.log(update.input);
        const response = await axios.put(
          `http://localhost:3001/api/update/${editingId}`,
          update
        );
        console.log(response.data.data);
        console.log(response.data.message);
      } else {
        const response = await axios.post(
          `http://localhost:3001/api/sendmessages`,
          data
        );
        console.log(response.data.message);
      }
      if (response.status === 200) {
        setdata({
          name: "",
          email: "",
          input: "",
        });
        setEditingId(null);
        window.location.reload();
      }
    } catch (error) {
      console.log("Api not hit");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/delete/${id}`
      );
      if (response.status == 200) {
        console.log(response.data.message);
        window.location.reload();
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log("Api not hit");
    }
  };

  const handleUpdate = (id, name, input, email) => {
    setdata({
      name: name,
      email: email,
      input: input,
    });
    setupdate({
      input: data.input,
    });
    setEditingId(id);
  };
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <form className="max-w-sm mx-auto" onSubmit={handlSubmit}>
          <div className="mb-5">
            <label
              for="name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-5">
            <label
              for="message"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your message
            </label>
            <input
              type="text"
              id="input"
              name="input"
              value={data.input}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>

      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Message</th>
            <th className="px-4 py-2">Delete</th>
            <th className="px-4 py-2">Update</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(tabledata) &&
            tabledata.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.email}</td>
                <td className="px-4 py-2">{item.input}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() =>
                      handleUpdate(item._id, item.name, item.input, item.email)
                    }
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
