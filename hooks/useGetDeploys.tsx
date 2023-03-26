import { useQuery } from "react-query";
import { getDeploys } from "../services/httpReq";
import { DeploysPayload } from "../types/deploys";

export const useGetDeploys = (page, limit) =>
  useQuery<DeploysPayload, Error>("deploys", () => getDeploys(page, limit), {
    refetchOnWindowFocus: false,
    // cached request will stay "fresh" for 10 seconds
    staleTime: 10000,
  });
