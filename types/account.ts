export interface TotalRewardAccountPayload {
  data: string;
}

export interface DelegationsDetailsPayload {
  data: DelegationsDetail[];
  pageCount: null;
  itemCount: number;
  pages: Page[];
}

export interface DelegationsDetail {
  public_key: string;
  stake: string;
  bonding_purse: string;
  validator_public_key: string;
  account_info: null;
}

export interface Page {
  number: number;
  url: string;
}

export interface UndelegateTokensPayload {
  data: string;
}

export interface ItemFromHashAccountPayload {
  jsonrpc: string;
  id: number;
  result: ItemFromHasAccount;
}

export interface ItemFromHasAccount {
  api_version: string;
  stored_value: StoredValue;
  merkle_proof: string;
}

export interface StoredValue {
  Account: Account;
}

export interface Account {
  account_hash: string;
  named_keys: any[];
  main_purse: string;
  associated_keys: AssociatedKey[];
  action_thresholds: ActionThresholds;
}

export interface ActionThresholds {
  deployment: number;
  key_management: number;
}

export interface AssociatedKey {
  account_hash: string;
  weight: number;
}

export interface BalancePayload {
  jsonrpc: string;
  id: number;
  result: Result;
}

export interface Result {
  api_version: string;
  balance_value: string;
  merkle_proof: string;
}
