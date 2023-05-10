import { gql } from "@apollo/client";

export const ACTIVE_WALLETS_BY_DAY_QUERY = gql`
  query GetActiveWalletsByDay($date: String!) {
    v_mat_active_addresses_detailed(
      order_by: { number_of_deploy_requested: desc }
      where: { date: { _gte: $date } }
    ) {
      public_key
      number_of_deploy_requested
    }
  }
`;
