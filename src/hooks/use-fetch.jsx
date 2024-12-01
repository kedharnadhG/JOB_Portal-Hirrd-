import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const { session } = useSession();

  const fn = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const supbaseAccessToken = await session.getToken({
        template: "supabase",
      });
      const response = await cb(supbaseAccessToken, options, ...args);
      // console.log(response);
      setData(response);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error, fn };
};

export default useFetch;
