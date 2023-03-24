import { useQuery } from "react-query";
import { getStatusInfos } from "../services/httpReq";
import { StatusInfoPayload } from "../types";

export const useGetStatusInfos = () =>
  useQuery<StatusInfoPayload, Error>("status", getStatusInfos);
