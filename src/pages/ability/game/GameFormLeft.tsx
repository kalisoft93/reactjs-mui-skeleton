import CommonSelector from "components/shared/CommonSelector";
import TreeSelector from "components/shared/TreeSelector";
import { FormControlProps } from "components/shared/types/FormControlProps";
import useAbility from "hooks/ability/useAbility";
import useCommon from "hooks/common/useCommon";
import useLevels from "hooks/levels/useLevels";
import usePlan from "hooks/plan/usePlan";
import { Fragment } from "react";
import { categoryTreeMap, selectorDefaultMap } from "utils/utils";

type PlanTaskFormLeftProps = {
  abilityCatProps: FormControlProps;
  planCategoriesProps: FormControlProps;
  levelsProps: FormControlProps;
  roles: FormControlProps;
};

const GameFormLeft = ({
  abilityCatProps,
  planCategoriesProps,
  levelsProps,
  roles,
}: PlanTaskFormLeftProps) => {
  const { getAbilityCategories } = useAbility();
  const { getPlanCategories } = usePlan();
  const { getRoleData } = useCommon();
  const { getLevels } = useLevels();

  return (
    <Fragment>
      <TreeSelector
        required={false}
        title="Képesség kategória választó"
        {...abilityCatProps}
        fetcher={getAbilityCategories}
        mapper={categoryTreeMap}
      ></TreeSelector>
      <TreeSelector
        {...planCategoriesProps}
        required={false}
        title="Terv kategória választó"
        fetcher={getPlanCategories}
        mapper={categoryTreeMap}
      ></TreeSelector>

      <CommonSelector
        fetcher={getRoleData}
        mapper={selectorDefaultMap}
        {...roles}
        required={true}
        title="Role választó"
        placeholder="Role"
      ></CommonSelector>

<CommonSelector
        fetcher={getLevels}
        mapper={(rawData) => rawData}
        {...levelsProps}
        required={true}
        placeholder="Szint"
        title="Szint választó"
        singleSelect={true}
      ></CommonSelector>
    </Fragment>
  );
};

export default GameFormLeft;
