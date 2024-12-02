import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTeamMember } from "../services/api";

function AddPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    role: "Regular",
  });

  const [errors, setErrors] = useState({}); // Track validation errors
  const navigate = useNavigate();

  useEffect(() => {
    // Pre-fill role preference from local storage
    const savedRole = localStorage.getItem("defaultRole");
    if (savedRole) {
      setFormData((prevData) => ({ ...prevData, role: savedRole }));
    }
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    return phoneRegex.test(phone);
  };

  const formatPhoneNumber = (phone) => {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? `${match[1]}-${match[2]}-${match[3]}` : phone;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Automatically format phone number
    if (name === "phone_number") {
      const formatted = formatPhoneNumber(value);
      setFormData({ ...formData, [name]: formatted });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear error for the field on input
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!validateEmail(formData.email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    if (!validatePhoneNumber(formData.phone_number)) {
      validationErrors.phone_number =
        "Please enter a valid phone number in the format 123-456-7890.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Save role preference to local storage
    localStorage.setItem("defaultRole", formData.role);

    await createTeamMember(formData);
    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold text-left">Add a team member</h1>
      <p className="text-gray-600 mb-6 text-left">Set email, location, and role</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Info Section */}
        <div>
          <hr className="border-gray-300 mb-4" />
          <h2 className="text-lg font-semibold mb-2 text-left">Info</h2>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            className="w-full border px-3 py-2 rounded mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={handleChange}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            className="w-full border px-3 py-2 rounded mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            aria-describedby="email-help"
            className={`w-full border px-3 py-2 rounded mb-1 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              errors.email ? "border-red-500" : ""
            }`}
            onChange={handleChange}
          />
          {errors.email && <p id="email-help" className="text-red-500 text-sm mb-4">{errors.email}</p>}
          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number (e.g., 123-456-7890)"
            value={formData.phone_number}
            aria-describedby="phone-help"
            className={`w-full border px-3 py-2 rounded mb-1 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              errors.phone_number ? "border-red-500" : ""
            }`}
            onChange={handleChange}
          />
          {errors.phone_number && (
            <p id="phone-help" className="text-red-500 text-sm mb-4">{errors.phone_number}</p>
          )}
        </div>

        {/* Role Section */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-left">Role</h2>
          <label className="flex items-center justify-between mb-2">
            <span className={formData.role === "Admin" ? "text-gray-500" : ""}>
              Regular - Can’t delete members
            </span>
            <input
              type="radio"
              name="role"
              value="Regular"
              checked={formData.role === "Regular"}
              onChange={handleChange}
            />
          </label>
          <label className="flex items-center justify-between">
            <span className={formData.role === "Regular" ? "text-gray-500" : ""}>
              Admin - Can delete members
            </span>
            <input
              type="radio"
              name="role"
              value="Admin"
              checked={formData.role === "Admin"}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Save Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPage;
