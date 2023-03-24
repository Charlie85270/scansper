import { useQuery } from "react-query";
import { getHistoryCasperPrice } from "../services/httpReq";
import { PriceHistoryPayload } from "../types";

export const useGetHistoryCasperPrice = (day: number) =>
  useQuery<PriceHistoryPayload, Error>("prices", () =>
    getHistoryCasperPrice(day)
  );
