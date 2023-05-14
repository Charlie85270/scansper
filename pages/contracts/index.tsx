import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import Card from "../../components/shared/Card/Card";
import ContractsList from "../../components/shared/ContractsList/ContractsList";

export const IndexPage = () => {
  return (
    <AppLayout
      title="Scansper | Contracts"
      desc="Find all informations about contracts deployed on the Casper Network blockchain"
    >
      <Card titleSize="large" title="Contracts">
        <ContractsList />
      </Card>
    </AppLayout>
  );
};

export default IndexPage;
