import React from "react";
import AppLayout from "../../components/layout/AppLayout";
import ValidatorsList from "../../components/shared/ValidatorsList/ValidatorsList";
import { useGetAllValidators } from "../../hooks/useGetAllValidators";
import { useGetStatusInfos } from "../../hooks/useGetStatusInfos";

export const IndexPage = () => {
  const statusInfos = useGetStatusInfos();
  const era = statusInfos.data?.result.last_added_block_info.era_id || 0;
  const validators = useGetAllValidators(era);

  console.log(validators);
  return (
    <AppLayout
      title="Casper Network Validators list"
      desc="Find the best validators to stake you CSPR tokens"
    >
      <ValidatorsList />
    </AppLayout>
  );
};

export default IndexPage;
