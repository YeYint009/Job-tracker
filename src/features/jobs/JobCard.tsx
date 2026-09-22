import type { Job } from "./job";

type JobCardProps = {
  job: Job;
  onDelete: (id:number) => void;
  onToggle: (id:number) => void;
}

export function JobCard({job,onDelete,onToggle}: JobCardProps) {
  return (
    <div>
      <h2>{job.company}</h2>
      <p>Salary: {job.salary}</p>
      <p>Status: {job.isApplied ? "Applied" : "Not Applied"}</p>
      <button onClick = {() => onDelete(job.id)}>
        Delete
      </button>
      <button onClick={() => onToggle(job.id)}>
        Toggle
      </button>
    </div>
  )
}