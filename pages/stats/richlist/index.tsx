import React from "react";
import AppLayout from "../../../components/layout/AppLayout";
import Card from "../../../components/shared/Card/Card";
import RichList from "../../../components/shared/RichList/RichList";

export const RichListPage = () => {
  return (
    <AppLayout
      title="Casper Network rich list"
      desc="Top holders and addresses of the Casper network"
    >
      <Card titleSize="large" title="Rich list">
        <RichList />
      </Card>
    </AppLayout>
  );
};

export default RichListPage;
