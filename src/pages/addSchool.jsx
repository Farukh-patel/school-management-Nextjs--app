// src/pages/addSchool.jsx
import { useForm } from "react-hook-form";
import { useState } from "react";
import Router from "next/router";
import Link from "next/link";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    const formData = new FormData();
    // append fields; image is FileList
    Object.keys(data).forEach((key) => {
      if (key === "image") {
        if (data.image && data.image[0]) formData.append("image", data.image[0]);
      } else {
        formData.append(key, data[key]);
      }
    });

    try {
      const res = await fetch("/api/schools", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setMessage("✅ School added successfully!");
        reset();
        // optionally redirect to showSchools
        // Router.push("/showSchools");
      } else {
        const err = await res.json().catch(() => null);
        setMessage("❌ Error adding school. " + (err?.error || ""));
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        <div className="mb-4">
          <Link 
            href="/" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold mb-4 text-center">Add School</h2>

          <input {...register("name", { required: true })} placeholder="School Name" className="w-full mb-3 p-2 border rounded" />
          {errors.name && <span className="text-red-500 text-sm">Name is required</span>}

          <input {...register("address", { required: true })} placeholder="Address" className="w-full mb-3 p-2 border rounded" />
          {errors.address && <span className="text-red-500 text-sm">Address is required</span>}

          <input {...register("city", { required: true })} placeholder="City" className="w-full mb-3 p-2 border rounded" />
          {errors.city && <span className="text-red-500 text-sm">City is required</span>}

          <input {...register("state", { required: true })} placeholder="State" className="w-full mb-3 p-2 border rounded" />
          {errors.state && <span className="text-red-500 text-sm">State is required</span>}

          <input {...register("contact", { required: true, pattern: /^[0-9]{7,20}$/ })} placeholder="Contact" className="w-full mb-3 p-2 border rounded" />
          {errors.contact && <span className="text-red-500 text-sm">Enter valid contact</span>}

          <input {...register("email_id", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" className="w-full mb-3 p-2 border rounded" />
          {errors.email_id && <span className="text-red-500 text-sm">Enter valid email</span>}

          <input type="file" {...register("image", { required: true })} className="mb-3" />
          {errors.image && <span className="text-red-500 text-sm">Image is required</span>}

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition">Submit</button>

          {message && <p className="mt-3 text-center font-medium">{message}</p>}
        </form>
      </div>
    </div>
  );
}
