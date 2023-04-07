import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import Card from "../../components/shared/Card/Card";
import Last14DeploysStatsChart from "../../components/shared/Chart/Last14DaysDeploys/Last14DaysDeploys";
import DeploysList from "../../components/shared/DeploysList/DeploysList";

export const IndexPage = () => {
  return (
    <AppLayout
      title="Casper Network deploys list"
      desc="Get all informations about transactions, deploys, staking, mint on Casper network"
    >
      <Card titleSize="large" title="Deploys">
        <Last14DeploysStatsChart />
        <DeploysList />
      </Card>
    </AppLayout>
  );
};

export default IndexPage;
