"use client";
import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaPlus,
  FaUser,
  FaCalendar,
  FaBalanceScale,
  FaBell,
} from "react-icons/fa";
import LawyerHeader from '@/app/Advocates/LawyerHeader/page'

const defaultCases = [
  {
    id: 1,
    caseNumber: "CL-2023-0456",
    title: "Smith vs. Johnson",
    client: "John Smith",
    type: "Civil",
    status: "Active",
    nextHearing: "2023-12-15",
    lastUpdated: "2 days ago",
  },
  {
    id: 2,
    caseNumber: "CR-2023-0789",
    title: "State vs. Anderson",
    client: "Michael Anderson",
    type: "Criminal",
    status: "Pending",
    nextHearing: "2023-12-20",
    lastUpdated: "1 week ago",
  },
];

const statusOptions = ["Active", "Pending", "Closed"];
const typeOptions = ["Civil", "Criminal", "Family", "Probate"];

const CasesPage = () => {
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({ status: "", type: "" });
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("cases");
    const parsed = saved ? JSON.parse(saved) : defaultCases;
    setCases(parsed);
    setFilteredCases(parsed);
  }, []);

  useEffect(() => {
    localStorage.setItem("cases", JSON.stringify(cases));
    handleSearchAndFilter();
  }, [cases, searchQuery, filter]);

  const handleSearchAndFilter = () => {
    let result = [...cases];

    if (searchQuery.trim()) {
      result = result.filter(
        (c) =>
          c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.client.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filter.status) {
      result = result.filter((c) => c.status === filter.status);
    }

    if (filter.type) {
      result = result.filter((c) => c.type === filter.type);
    }

    setFilteredCases(result);
  };

  const handleCreateCase = (e) => {
    e.preventDefault();
    const form = e.target;
    const newCase = {
      id: Date.now(),
      caseNumber: form.caseNumber.value,
      title: form.title.value,
      client: form.client.value,
      type: form.type.value,
      status: form.status.value,
      nextHearing: form.nextHearing.value,
      lastUpdated: "Just now",
    };
    const updated = [...cases, newCase];
    setCases(updated);
    setIsCreateOpen(false);
  };

  const handleEditCase = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedCase = {
      ...selectedCase,
      caseNumber: form.caseNumber.value,
      title: form.title.value,
      client: form.client.value,
      type: form.type.value,
      status: form.status.value,
      nextHearing: form.nextHearing.value,
      lastUpdated: "Just now",
    };
    const updated = cases.map((c) => (c.id === selectedCase.id ? updatedCase : c));
    setCases(updated);
    setIsEditOpen(false);
  };

  const openEditModal = (caseData) => {
    setSelectedCase(caseData);
    setIsEditOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <LawyerHeader />  
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Case Management</h1>
          <button className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-100">
            <FaBell className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search and Filter */}
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              className="w-full pl-10 pr-3 py-2 border rounded-md"
              placeholder="Search cases..."
            />
          </div>
          <div className="flex gap-2">
            <select
              onChange={(e) => setFilter((f) => ({ ...f, type: e.target.value }))}
              value={filter.type}
              className="border px-3 py-2 rounded-md"
            >
              <option value="">All Types</option>
              {typeOptions.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            <select
              onChange={(e) => setFilter((f) => ({ ...f, status: e.target.value }))}
              value={filter.status}
              className="border px-3 py-2 rounded-md"
            >
              <option value="">All Statuses</option>
              {statusOptions.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              <FaPlus className="inline mr-2" /> New Case
            </button>
          </div>
        </div>

        {/* Cases Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-3 text-left">Case Number</th>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Client</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Next Hearing</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-blue-600">{c.caseNumber}</td>
                  <td className="px-6 py-4">{c.title}</td>
                  <td className="px-6 py-4 flex items-center">
                    <FaUser className="mr-2 text-gray-400" />
                    {c.client}
                  </td>
                  <td className="px-6 py-4 flex items-center">
                    <FaBalanceScale className="mr-2 text-gray-400" />
                    {c.type}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        c.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : c.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center text-sm text-gray-500">
                    <FaCalendar className="mr-2 text-gray-400" />
                    {c.nextHearing}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className="text-blue-600 hover:underline mr-4"
                      onClick={() => alert(JSON.stringify(c, null, 2))}
                    >
                      View
                    </button>
                    <button
                      onClick={() => openEditModal(c)}
                      className="text-indigo-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Case Modal */}
      {isCreateOpen && (
        <Modal title="Create New Case" onClose={() => setIsCreateOpen(false)} onSubmit={handleCreateCase} />
      )}

      {/* Edit Case Modal */}
      {isEditOpen && selectedCase && (
        <Modal
          title="Edit Case"
          onClose={() => setIsEditOpen(false)}
          onSubmit={handleEditCase}
          data={selectedCase}
        />
      )}
    </div>
  );
};

const Modal = ({ title, onClose, onSubmit, data }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 pt-10">
      <form onSubmit={onSubmit} className="bg-white rounded-md p-6 w-full max-w-md space-y-4 shadow-lg">
        <h2 className="text-xl font-bold">{title}</h2>
        <input name="caseNumber" defaultValue={data?.caseNumber} required className="w-full border px-3 py-2 rounded" placeholder="Case Number" />
        <input name="title" defaultValue={data?.title} required className="w-full border px-3 py-2 rounded" placeholder="Title" />
        <input name="client" defaultValue={data?.client} required className="w-full border px-3 py-2 rounded" placeholder="Client Name" />
        <select name="type" defaultValue={data?.type} required className="w-full border px-3 py-2 rounded">
          <option value="">Select Type</option>
          {typeOptions.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <select name="status" defaultValue={data?.status} required className="w-full border px-3 py-2 rounded">
          <option value="">Select Status</option>
          {statusOptions.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <input name="nextHearing" defaultValue={data?.nextHearing} required type="date" className="w-full border px-3 py-2 rounded" />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
        </div>
      </form>
    </div>
   
  );
};

export default CasesPage;
