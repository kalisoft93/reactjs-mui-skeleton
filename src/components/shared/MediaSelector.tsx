import { Paper, Typography } from "@mui/material";
import useMedia from "hooks/tag/useMedia";
import { useEffect, useState } from "react";
import { Control } from "react-hook-form";
import FHSelect from "./FHSelect";
import FlexBox from "./FlexBox";

type MediaSelectorInputs = {
  changeHandler?: (selectedValues) => void;
  control: Control<any, any>;
  controlName: any;
  required?: boolean;
  singleSelect?: boolean;
  title?: string;
};

const MediaSelector = (props: MediaSelectorInputs) => {
  const [mediaList, setMediaList] = useState([]);

  const { getMediaList } = useMedia();

  useEffect(() => {
    getMediaList().then((list) => {
      const mediaList = list.data.map((media) => {
        return {id: media.id, title: media.label};
      });
      setMediaList(mediaList);
    });
  }, []);

  return (
    <Paper sx={{ p: "10px" }}>
      <FlexBox sx={{ flexDirection: "column"}}>
        <Typography variant="subtitle1">{props.title || 'Média választó'}</Typography>
        <FHSelect
          placeholder="Media"
          options={mediaList}
          control={props.control}
          required={props.required}
          controlName={props.controlName}
          singleSelect={props.singleSelect}
        ></FHSelect>
      </FlexBox>
    </Paper>
  );
};

export default MediaSelector;
