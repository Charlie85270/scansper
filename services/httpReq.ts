import qs from "query-string";
import {
  AuctionMetricsPayload,
  PriceHistoryPayload,
  QueryConfig,
  StatusInfoPayload,
  SupplyInformationsPayload,
  TrendingNFTCollectionPayload,
} from "../types";
import { CoinCommunityPayload } from "../types/coinGeckoTypes";
import { ValidatorsPayload } from "../types/validators";
import { DeploysPayload } from "../types/deploys";
import fetch from "./request";
import {
  BlocksValidatorPayload,
  DelegatorsPayload,
  RewardsDelegatorPayload,
  RewardsValidatorsPayload,
  ValidatorPayload,
} from "../types/validator";

import {
  BalancePayload,
  DelegationsDetailsPayload,
  ItemFromHashAccountPayload,
  TotalRewardAccountPayload,
  UndelegateTokensPayload,
} from "../types/account";

export const v1Prefix = "/v1";
export const statPrefix = "/stat";

const coingecko_url = "https://api.coingecko.com/api/v3/";
const casper_token_id = "casper-network";
const make_api_url = "https://event-store-api-clarity-mainnet.make.services/";
const friendly_market_url = "https://nft-api.friendly.market/api/v1/";
const casper_holders_url = "https://data.casperholders.com/";

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

export const getDeploys = (
  page: number,
  limit: number = 10
): Promise<DeploysPayload> => {
  return sendRequest({
    url: `${make_api_url}extended-deploys?page=${page}&limit=${limit}&fields=entry_point,contract_package&with_amounts_in_currency_id=1`,
  });
};

export const getCoinCommunityData = (): Promise<CoinCommunityPayload> => {
  return sendRequest({
    url: `${coingecko_url}coins/${casper_token_id}?tickers=false&market_data=false&developer_data=true&sparkline=false`,
  });
};

export const getCountLast14daysDeploys = () => {
  return sendRequest({
    url: `${casper_holders_url}full_stats`,
  });
};

export const getAllValidators = (eraId): Promise<ValidatorsPayload> => {
  return sendRequest({
    url: `${make_api_url}validators?page=1&limit=100&era_id=${eraId}&fields=account_info,average_performance`,
  });
};

export const getValidator = (publicKey: string): Promise<ValidatorPayload> => {
  return sendRequest({
    url: `${make_api_url}auction-validators/${publicKey}?fields=account_info,average_performance`,
  });
};

export const getValidatorTotalRewards = (
  publicKey: string
): Promise<RewardsValidatorsPayload> => {
  return sendRequest({
    url: `${make_api_url}validators/${publicKey}/total-rewards`,
  });
};
export const getDelegatorsTotalRewards = (
  publicKey: string
): Promise<RewardsValidatorsPayload> => {
  return sendRequest({
    url: `${make_api_url}delegators/${publicKey}/total-rewards`,
  });
};
export const getValidatorTotalDelegatorsRewards = (
  publicKey: string
): Promise<RewardsValidatorsPayload> => {
  return sendRequest({
    url: `${make_api_url}validators/${publicKey}/total-delegator-rewards`,
  });
};

export const getValidatorsListByDelegator = (
  publicKey: string,
  page?: number
): Promise<DelegatorsPayload> => {
  return sendRequest({
    url: `${make_api_url}auction-validators/${publicKey}/delegations?page=${
      page || 1
    }&limit=12&fields=account_info`,
  });
};

export const getRewardsByDelegator = (
  publicKey: string,
  page?: number
): Promise<RewardsDelegatorPayload> => {
  return sendRequest({
    url: `${make_api_url}validators/${publicKey}/rewards?page=${
      page || 1
    }&limit=12&with_amounts_in_currency_id=1`,
  });
};

export const getBlocksByValidator = (
  publicKey: string,
  page?: number
): Promise<BlocksValidatorPayload> => {
  return sendRequest({
    url: `${make_api_url}validators/${publicKey}/blocks?page=${
      page || 1
    }&limit=12`,
  });
};

export const getTotalRewardsByAccount = (
  publicKey: string
): Promise<TotalRewardAccountPayload> => {
  return sendRequest({
    url: `${make_api_url}delegators/${publicKey}/total-rewards`,
  });
};

export const getDelegationDetailsByAccount = (
  publicKey: string
): Promise<DelegationsDetailsPayload> => {
  return sendRequest({
    url: `${make_api_url}accounts/${publicKey}/delegations?page=1&limit=-1&fields=account_info`,
  });
};

export const getTokenUndelegateByAccount = (
  publicKey: string,
  eraId: number
): Promise<UndelegateTokensPayload> => {
  return sendRequest({
    url: `${make_api_url}accounts/${publicKey}/tokens-in-undelegation/${eraId}`,
  });
};

export const getItemFromHashAccount = (
  state_root_hash: string,
  accountHash: string
): Promise<ItemFromHashAccountPayload> => {
  return sendRequest({
    url: `${make_api_url}rpc/state_get_item?state_root_hash=${state_root_hash}&key=${accountHash}`,
  });
};

export const getBalanceFromUref = (
  state_root_hash: string,
  purse_uref: string
): Promise<BalancePayload> => {
  return sendRequest({
    url: `${make_api_url}rpc/state_get_balance?state_root_hash=${state_root_hash}&purse_uref=${purse_uref}`,
  });
};
