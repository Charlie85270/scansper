import { useQuery } from "react-query";
import { getAllValidators } from "../services/httpReq";
import { ValidatorsPayload } from "../types/validators";

export const useGetAllValidators = eraId =>
  useQuery<ValidatorsPayload, Error>("metrics", () => getAllValidators(eraId), {
    enabled: Boolean(eraId),
  });
