import { useQuery } from "react-query";
import { getAuctionMetrics } from "../services/httpReq";
import { AuctionMetricsPayload } from "../types";

export const useGetAuctionMetrics = () =>
  useQuery<AuctionMetricsPayload, Error>("metrics", getAuctionMetrics);
