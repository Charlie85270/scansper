import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import Card from "../../components/shared/Card/Card";
import ContractsList from "../../components/shared/ContractsList/ContractsList";

export const IndexPage = () => {
  return (
    <AppLayout
      title="Casper Network contracts list"
      desc="Get all informations about transactions, deploys, contracts staking, mint on Casper network"
    >
      <Card titleSize="large" title="Contracts">
        <ContractsList />
      </Card>
    </AppLayout>
  );
};

export default IndexPage;
