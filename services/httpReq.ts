import qs from "query-string";
import {
  AuctionMetricsPayload,
  PriceHistoryPayload,
  QueryConfig,
  StatusInfoPayload,
  SupplyInformationsPayload,
  TrendingNFTCollectionPayload,
} from "../types";
import fetch from "./request";

export const v1Prefix = "/v1";
export const statPrefix = "/stat";

const coingecko_url = "https://api.coingecko.com/api/v3/";
const casper_token_id = "casper-network";
const make_api_url = "https://event-store-api-clarity-mainnet.make.services/";
const friendly_market_url = "https://nft-api.friendly.market/api/v1/";

export const sendRequest = (config: QueryConfig) => {
  return fetch(qs.stringifyUrl({ url: config.url, query: config.query }), {
    method: config.method || "GET",
    body: config.body,
    headers: config.headers,
  });
};

export const getHistoryCasperPrice = (
  days: number,
  query?: { interval: string }
): Promise<PriceHistoryPayload> => {
  return sendRequest({
    url: `${coingecko_url}coins/${casper_token_id}/market_chart?vs_currency=usd&days=${days}`,
    query,
  });
};

export const getCasperSupplyInfo = (): Promise<SupplyInformationsPayload> => {
  return sendRequest({
    url: `${make_api_url}supply/?is_cached=1`,
  });
};

export const getAuctionMetrics = (): Promise<AuctionMetricsPayload> => {
  return sendRequest({
    url: `${make_api_url}auction-metrics`,
  });
};

export const getTrandingNFTCollections =
  (): Promise<TrendingNFTCollectionPayload> => {
    return sendRequest({
      url: `${friendly_market_url}nft/collections/rankings?days=0&limit=100`,
    });
  };

export const getStatusInfos = (): Promise<StatusInfoPayload> => {
  return sendRequest({
    url: `${make_api_url}rpc/info_get_status`,
  });
};
