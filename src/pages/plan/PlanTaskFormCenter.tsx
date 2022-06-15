import CommonSelector from "components/shared/CommonSelector";
import TagSelector from "components/shared/TagSelector";
import { FormControlProps } from "components/shared/types/FormControlProps";
import useLevels from "hooks/levels/useLevels";
import useMedia from "hooks/media/useMedia";
import { Fragment } from "react";
import { selectorDefaultMap } from "utils/utils";

export type PlanTaskFormCenterProps = {
  tagsProps: FormControlProps;
  mediaProps: FormControlProps;
  bannerProps: FormControlProps;
  levelsProps: FormControlProps;
};

const PlanTaskFormCenter = ({
  tagsProps,
  mediaProps,
  bannerProps,
  levelsProps
}: PlanTaskFormCenterProps) => {

  const { getMediaListData } = useMedia();
  const { getLevels } = useLevels();

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
    </Fragment>
  );
};

export default PlanTaskFormCenter;
