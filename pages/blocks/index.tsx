import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import BlocksList from "../../components/shared/BlocksList/BlocksList";
import Card from "../../components/shared/Card/Card";

export const BlocksPage = () => {
  return (
    <AppLayout
      title="Scansper | Blocks list"
      desc="List of all blocks produced by the Casper Network"
    >
      <Card titleSize="large" title="Latest blocks">
        <BlocksList />
      </Card>
    </AppLayout>
  );
};

export default BlocksPage;
