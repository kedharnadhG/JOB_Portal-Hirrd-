import CreatedApplications from "@/components/created-applications";
import CreatedJobs from "@/components/created-jobs";
import { useUser } from "@clerk/clerk-react";
import React from "react";
import { BarLoader } from "react-spinners";

const MyJobs = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color={"#36d7b7"} />;
  }

  return (
    <div>
      <h1 className="gradient-title text-5xl font-extrabold sm:text-7xl text-center pb-8">
        {user?.unsafeMetadata?.role === "recruiter"
          ? "My Jobs"
          : "My Applications"}
      </h1>

      {user?.unsafeMetadata?.role === "candidate" ? (
        <CreatedApplications />
      ) : (
        <CreatedJobs />
      )}
    </div>
  );
};

export default MyJobs;
