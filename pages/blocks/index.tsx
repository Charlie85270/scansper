import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import BlocksList from "../../components/shared/BlocksList/BlocksList";
import Card from "../../components/shared/Card/Card";

export const BlocksPage = () => {
  return (
    <AppLayout
      title="Scansper | Blocks "
      desc="Explore all blocks produced by the Casper Network blockcahin on Scansper explorer"
    >
      <Card titleSize="large" title="Latest blocks">
        <BlocksList />
      </Card>
    </AppLayout>
  );
};

export default BlocksPage;
