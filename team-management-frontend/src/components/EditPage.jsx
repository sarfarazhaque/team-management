import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTeamMemberById, updateTeamMember, deleteTeamMember } from "../services/api";

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    role: "Regular",
  });
  const [errors, setErrors] = useState({}); // Track validation errors
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

  const fetchTeamMember = async () => {
    const member = await getTeamMemberById(id);
    setFormData(member);
  };

  useEffect(() => {
    fetchTeamMember();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};
  
    if (!validateEmail(formData.email)) {
      validationErrors.email = "Please enter a valid email address.";
    }
  
    if (!validatePhoneNumber(formData.phone_number)) {
      validationErrors.phone_number = "Please enter a valid 10-digit phone number.";
    }
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    await updateTeamMember(id, formData);
    navigate("/");
  };

  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
        await deleteTeamMember(id); // Wait for the delete API call to complete
        navigate("/"); // Navigate only after successful deletion
      } catch (error) {
        console.error("Failed to delete team member:", error);
        alert("Failed to delete the team member. Please try again.");
      }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold text-left">Edit team member</h1>
      <p className="text-gray-600 mb-6 text-left">
        Edit contact info, location, and role
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Live Region for Errors */}
        <div aria-live="polite" className="sr-only">
            {errors.email && <p>Email error: {errors.email}</p>}
            {errors.phone_number && <p>Phone number error: {errors.phone_number}</p>}
        </div>
        {/* Info Section */}
        <div>
          <hr className="border-gray-300 mb-4" />
          <h2 className="text-lg font-semibold mb-2 text-left">Info</h2>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            className="w-full border px-3 py-2 rounded mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={handleChange}
          />
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            className="w-full border px-3 py-2 rounded mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            className={`w-full border px-3 py-2 rounded mb-1 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.email ? "border-red-500" : ""
            }`}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm mb-4">{errors.email}</p>}
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            className={`w-full border px-3 py-2 rounded mb-1 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.phone_number ? "border-red-500" : ""
            }`}
            onChange={handleChange}
          />
          {errors.phone_number && (
            <p className="text-red-500 text-sm mb-4">{errors.phone_number}</p>
          )}
        </div>

        {/* Role Section */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-left">Role</h2>
          <label className="flex items-center justify-between mb-2">
            <span
              className={formData.role !== "Regular" ? "text-gray-500" : ""}
            >
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
            <span
              className={formData.role !== "Admin" ? "text-gray-500" : ""}
            >
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

        {/* Buttons */}
        <div className="flex justify-between">
          {/* Trigger Modal */}  
          <button
            type="button"
            className="text-red-500 border border-gray-300 px-3 py-1 rounded bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onClick={() => setShowConfirm(true)}
          >
            Delete
          </button>
          {/* Confirmation Modal */}
          {showConfirm && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-6 rounded shadow-md">
                <p>Are you sure you want to delete this team member?</p>
                <div className="flex justify-end mt-4 space-x-2">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => {
                            setShowConfirm(false); // Close the modal
                            handleDelete(); // Execute delete logic
                        }}
                    >
                        Confirm
                    </button>
                    <button
                        className="bg-gray-300 text-black px-4 py-2 rounded"
                        onClick={() => setShowConfirm(false)}
                    >
                        Cancel
                    </button>
                </div>
              </div>
            </div>
          )}
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

export default EditPage;
