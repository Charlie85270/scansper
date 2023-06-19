import React from "react";
import RewardsByEra from "./RewardsByEra";
import CSPRStakedByDay from "./CSPRStakedByDay";
import DelegateUndelegateByDay from "./DelegateUndelegateByDay";
import DelegatorsByDay from "./DelegatorsByDay";

const StatsOfValidator = () => {
  return (
    <div className="w-full overflow-y-hidden flex-nowrap">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <RewardsByEra />
        <CSPRStakedByDay />
        <DelegateUndelegateByDay />
        <DelegatorsByDay />
      </div>
    </div>
  );
};

export default StatsOfValidator;
