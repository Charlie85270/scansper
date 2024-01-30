import { CLValueBuilder, decodeBase16 } from "casper-js-sdk";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

import AppLayout from "../../components/layout/AppLayout";
import TransferForm from "../../components/shared/TransferForm/TransferForm";

export const Search = () => {
  return (
    <AppLayout
      title="Scansper | Transfer Page"
      desc="Transfer CSPR on the Casper Network"
    >
      <TransferForm />
    </AppLayout>
  );
};

export default Search;
