import { useState } from "react";
import { jobs as initialJob } from "./features/jobs/jobs";
import { JobCard } from "./features/jobs/JobCard";

function App() {
  const [jobs, setJobs] = useState(initialJob);
  const [salary, setSalary] = useState("");
  const [company, setCompany] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleAddJob = () => {
    if (!company.trim() || !salary) {
      alert("Please enter company name or salary");
      return;
    }

    const newId =
      jobs.length === 0 ? 1 : Math.max(...jobs.map((job) => job.id)) + 1;

    const newJob = {
      id: newId,
      company,
      salary: Number(salary),
      isApplied: true,
    };

    setJobs([...jobs, newJob]);
    setCompany("");
    setSalary("");
  };

  const handleDeleteJob = (id: number) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  const handleToggleJob = (id: number) => {
    setJobs(
      jobs.map((job) =>
        job.id === id ? { ...job, isApplied: !job.isApplied } : job,
      ),
    );
  };

  const filterItem = jobs.filter((job) => {
    const matchSearch = job.company
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "isApplied" && job.isApplied) ||
      (statusFilter === "notApplied" && !job.isApplied);

    return matchSearch && matchStatus;
  });

  return (
    <main>
      <h1>Job Tracker</h1>
      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Company Name"
      />
      <input
        type="number"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        placeholder="Salary"
      />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={handleAddJob}>Add Jobs</button>
      {filterItem.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onDelete={handleDeleteJob}
          onToggle={handleToggleJob}
        />
      ))}

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="isApplied">Applied</option>
        <option value="notApplied">Not Applied</option>
      </select>
    </main>
  );
}

export default App;
