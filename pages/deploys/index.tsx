import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import Card from "../../components/shared/Card/Card";
import Last14DeploysStatsChart from "../../components/shared/Chart/Last14DaysDeploys/Last14DaysDeploys";
import DeploysList from "../../components/shared/DeploysList/DeploysList";

export const IndexPage = () => {
  return (
    <AppLayout
      title="Scansper | Deploys"
      desc="Find all informations about deploys made on the Casper Network blockchain"
    >
      <Card titleSize="large" title="Last 14 Deploys">
        <Last14DeploysStatsChart />
        <DeploysList />
      </Card>
    </AppLayout>
  );
};

export default IndexPage;
