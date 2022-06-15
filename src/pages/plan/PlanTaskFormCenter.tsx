import CommonSelector from "components/shared/CommonSelector";
import TagSelector from "components/shared/TagSelector";
import { FormControlProps } from "components/shared/types/FormControlProps";
import useAbilityTask from "hooks/ability/useAbilityTask";
import useLevels from "hooks/levels/useLevels";
import useMedia from "hooks/media/useMedia";
import useProduct from "hooks/products/useProduct";
import { Fragment } from "react";
import { selectorDefaultMap, selectorFilterMap } from "utils/utils";

export type PlanTaskFormCenterProps = {
  tagsProps: FormControlProps;
  mediaProps: FormControlProps;
  bannerProps: FormControlProps;
  levelsProps: FormControlProps;
  productProps: FormControlProps;
  aTaskProps: FormControlProps;
};

const PlanTaskFormCenter = ({
  tagsProps,
  mediaProps,
  bannerProps,
  levelsProps,
  productProps,
  aTaskProps
}: PlanTaskFormCenterProps) => {

  const { getMediaListData } = useMedia();
  const { getLevels } = useLevels();
  const { getProductListData} = useProduct();
  const { getTaskListData } = useAbilityTask();

  return (
    <Fragment>
      <TagSelector {...tagsProps} required={true}></TagSelector>
      <CommonSelector
        {...mediaProps}
        fetcher={getMediaListData}
        mapper={selectorDefaultMap}
        required={true}
        title="Kép választó"
        placeholder="Kép"
      ></CommonSelector>

      <CommonSelector
        fetcher={getMediaListData}
        mapper={selectorDefaultMap}
        {...bannerProps}
        required={true}
        placeholder="Banner"
        title="Banner választó"
        singleSelect={true}
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

      <CommonSelector
        {...productProps}
        fetcher={getProductListData}
        mapper={selectorFilterMap}
        required={true}
        withFilter={true}
        title="Termék választó"
        placeholder="Termék"
      ></CommonSelector>

    <CommonSelector
        {...aTaskProps}
        fetcher={getTaskListData}
        mapper={selectorFilterMap}
        required={true}
        withFilter={true}
        title="Feladat választó"
        placeholder="Feladat"
      ></CommonSelector>
    </Fragment>
  );
};

export default PlanTaskFormCenter;
