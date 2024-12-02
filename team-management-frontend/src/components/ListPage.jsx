import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTeamMembers } from "../services/api";

function ListPage() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showSearch, setShowSearch] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    const members = await getTeamMembers();
    setTeamMembers(members);
  };

  // Search and Filter Logic
  const filteredTeamMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole ? member.role === filterRole : true;
    return matchesSearch && matchesRole;
  });

  // Sorting Logic
  const sortedItems = [...filteredTeamMembers].sort((a, b) => {
    if (sortOption === "name") {
      return a.first_name.localeCompare(b.first_name);
    }
    if (sortOption === "email") {
      return a.email.localeCompare(b.email);
    }
    if (sortOption === "role") {
      return a.role.localeCompare(b.role);
    }
    return 0;
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-left">Team Members</h1>
        <button
          className="text-blue-500 text-3xl font-bold"
          onClick={() => navigate("/add")}
        >
          +
        </button>
      </div>

      {/* Filter Section */}
      <div className="flex justify-between items-center mb-4">
        {/* Role Filters */}
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded ${
              !filterRole ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilterRole("")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filterRole === "Admin" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilterRole("Admin")}
          >
            Admins
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filterRole === "Regular"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setFilterRole("Regular")}
          >
            Regulars
          </button>
        </div>

        {/* Icons for Search and Sort */}
        <div className="flex space-x-4">
          <button
            className="text-gray-600 hover:text-blue-500"
            onClick={() => setShowSearch(!showSearch)}
          >
            🔍
          </button>
          <button
            className="text-gray-600 hover:text-blue-500"
            onClick={() => setShowSort(!showSort)}
          >
            ⬆️
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name, email, or role"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      )}

      {/* Sort Options */}
      {showSort && (
        <div className="mb-4">
          <select
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}
          >
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="role">Role</option>
          </select>
        </div>
      )}

      {/* Team Members List */}
      <ul className="space-y-4">
        {currentItems.map((member) => (
          <li
            key={member.id}
            className="p-4 border rounded flex items-center hover:bg-gray-100 cursor-pointer"
            onClick={() => navigate(`/edit/${member.id}`)}
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-xl">
                👤
              </div>
              <div className="text-left">
                <div className="font-semibold">
                  {member.first_name} {member.last_name}
                  <span className="text-sm text-gray-500">
                    {member.role === "Admin" ? " (Admin)" : ""}
                  </span>
                </div>
                <div className="text-sm text-gray-600">{member.phone_number}</div>
                <div className="text-sm text-gray-600">{member.email}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ListPage;
