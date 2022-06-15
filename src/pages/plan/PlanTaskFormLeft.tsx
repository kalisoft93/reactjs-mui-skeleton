import CommonSelector from "components/shared/CommonSelector";
import TreeSelector from "components/shared/TreeSelector";
import { FormControlProps } from "components/shared/types/FormControlProps";
import useAbility from "hooks/ability/useAbility";
import useCommon from "hooks/common/useCommon";
import usePlan from "hooks/plan/usePlan";
import { Fragment } from "react";
import { categoryTreeMap, selectorDefaultMap } from "utils/utils";

type PlanTaskFormLeftProps = {
  abilityCatProps: FormControlProps;
  planCategoriesProps: FormControlProps;
  roles: FormControlProps;
  scopes: FormControlProps;
};

const PlanTaskFormLeft = ({
  abilityCatProps,
  planCategoriesProps,
  roles,
  scopes
}: PlanTaskFormLeftProps) => {
  const { getAbilityCategories } = useAbility();
  const { getPlanCategories } = usePlan();
  const { getRoleData, getScopes } = useCommon();

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
        fetcher={getScopes}
        mapper={(rawData) => rawData}
        {...scopes}
        required={true}
        title="Hatáskör választó"
        placeholder="Hatáskör"
        singleSelect={true}
      ></CommonSelector>

      <CommonSelector
        fetcher={getRoleData}
        mapper={selectorDefaultMap}
        {...roles}
        required={true}
        title="Role választó"
        placeholder="Role"
      ></CommonSelector>
    </Fragment>
  );
};

export default PlanTaskFormLeft;
