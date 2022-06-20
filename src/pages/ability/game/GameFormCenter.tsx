import CommonSelector from "components/shared/CommonSelector";
import TagSelector from "components/shared/TagSelector";
import { FormControlProps } from "components/shared/types/FormControlProps";
import useAbilityTask from "hooks/ability/useAbilityTask";
import useMedia from "hooks/media/useMedia";
import useProduct from "hooks/products/useProduct";
import { Fragment } from "react";
import { selectorDefaultMap, selectorFilterMap } from "utils/utils";

export type PlanTaskFormCenterProps = {
  tagsProps: FormControlProps;
  mediaProps: FormControlProps;
  bannerProps: FormControlProps;
  productProps: FormControlProps;
  aTaskProps: FormControlProps;
};

const GameFormCenter = ({
  tagsProps,
  mediaProps,
  bannerProps,
  productProps,
  aTaskProps
}: PlanTaskFormCenterProps) => {

  const { getMediaListData } = useMedia();
  const { getProductListData} = useProduct();
  const { getTaskListData } = useAbilityTask();

  return (
    <Fragment>
      <TagSelector {...tagsProps} required={false}></TagSelector>
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

export default GameFormCenter;
