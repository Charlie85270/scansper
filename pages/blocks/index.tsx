import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import BlocksList from "../../components/shared/BlocksList/BlocksList";
import Card from "../../components/shared/Card/Card";

export const BlocksPage = () => {
  return (
    <AppLayout
      title="Casper Network deploys list"
      desc="Get all informations about transactions, deploys, blocks, staking, mint on Casper network"
    >
      <Card titleSize="large" title="Latest blocks">
        <BlocksList />
      </Card>
    </AppLayout>
  );
};

export default BlocksPage;
