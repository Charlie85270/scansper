import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import Card from "../../components/shared/Card/Card";

import ValidatorsList from "../../components/shared/ValidatorsList/ValidatorsList";

export const IndexPage = () => {
  return (
    <AppLayout
      title="Scansper | Validators"
      desc="List of all active validators on the Casper Network"
    >
      <Card title="Validators" titleSize="large">
        <ValidatorsList />
      </Card>
    </AppLayout>
  );
};

export default IndexPage;
