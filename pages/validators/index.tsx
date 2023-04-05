import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import Card from "../../components/shared/Card/Card";
import ValidatorsList from "../../components/shared/ValidatorsList/ValidatorsList";

export const IndexPage = () => {
  return (
    <AppLayout
      title="Casper Network Validators list"
      desc="Find the best validators to stake you CSPR tokens"
    >
      <Card title="Validators" titleSize="large">
        <ValidatorsList />
      </Card>
    </AppLayout>
  );
};

export default IndexPage;
