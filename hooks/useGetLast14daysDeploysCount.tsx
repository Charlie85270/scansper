import { useQuery } from "react-query";
import { getCountLast14daysDeploys } from "../services/httpReq";

export const useGetLast14daysDeploysCount = () =>
  useQuery<
    {
      count: number;
      day: string;
      type?: "storedContractByHash" | "transfer" | "moduleBytes";
    }[],
    Error
  >("lastDeploys", getCountLast14daysDeploys);
