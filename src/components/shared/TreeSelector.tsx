import { ChevronRight, Expand, ExpandMore, KeyboardReturnSharp, Search } from "@mui/icons-material";
import { TreeItem, TreeView, treeItemClasses } from "@mui/lab";
import {
  Box,
  Checkbox,
  Chip,
  debounce,
  FormControlLabel,
  InputAdornment,
  ListItem,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { getNodesByIDs } from "utils/utils";
import FlexBox from "./FlexBox";

export interface TreeSelectorData {
  id: string;
  name: string;
  children?: TreeSelectorData[];
}

export type TreeFetcherResp = {
  id: any;
  title: string;
  [key: string]: any;
  subcategories?: TreeFetcherResp[];
};

type TreeSelectorProps = {
  fetcher: (searchTerm: string, withSubCategories: boolean) => Promise<any>;
  mapper: (nodes: TreeFetcherResp[]) => TreeSelectorData[];
  changeHandler?: (selectedValues) => void;
  control: Control<any, any>;
  controlName: any;
  required?: boolean;
  title?: string;
};

const STreeItem = styled(TreeItem)({
  ["& ." + treeItemClasses.content]: {
    boxSizing: "border-box",
  },
});

const TreeSelector = ({ fetcher, mapper, ...props }: TreeSelectorProps) => {

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [expanded, setExpanded] = React.useState<string[]>([]);

  useEffect(() => {
    init(searchTerm);
  }, []);

  const init = (searchTerm: string = "") => {
    fetcher(searchTerm, true).then((resp) => {
      setData(mapper(resp));
    });
  }

  const treeLabel = (field, id, name) => (
    <FormControlLabel
      control={
        <Checkbox
          id={`checkbox-${id}`}
          title={name}
          checked={field.value.includes(id)}
          onClick={e => (e.stopPropagation())}
          onChange={(e,checked) => selectHandle(e, checked, id, field)}
        />
      }
      label={name}
    />
  );

  const renderTree = (nodes: TreeSelectorData, field) => (
    <STreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={treeLabel(field, nodes.id, nodes.name)}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node, field))
        : null}
    </STreeItem>
  );


  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
    event.stopPropagation();
  };

  const selectHandle = (event, checked: boolean, id, field) => {
    if (checked) field.onChange(field.value.concat([id]));
    else  field.onChange(field.value.filter((sn) => sn !== id));
    event.stopPropagation();
  }

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    init(event.target.value);
  }

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 300);
  }, []);

  return (
    <Paper sx={{ p: "10px" }}>
      <FlexBox sx={{ flexDirection: "column", rowGap: "5px" }}>
        <Typography variant="subtitle1">{props.title || 'Kategória választó'}</Typography>
        <TextField
          sx={{p: "0px 10px"}}
          variant="standard"
          onChange={debouncedResults}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        ></TextField>
        <Controller
          name={props.controlName}
          control={props.control}
          rules={{
            required: props.required !== undefined ? props.required : false,
          }}
          render={({ field, fieldState }) => (
            <FlexBox flexDirection="column" rowGap="10px">
              <TreeView
                multiSelect
                defaultSelected={field.value}
                selected={field.value}
                expanded={expanded}
                onNodeToggle={handleToggle}
                defaultCollapseIcon={<ExpandMore />}
                defaultExpandIcon={<ChevronRight />}
                sx={{ flexGrow: 1 }}
              >
                {data.map((node) => {
                  return renderTree(node, field);
                })}
              </TreeView>
              <FlexBox flexWrap="wrap" justifyContent="start" rowGap="5px">
                {getNodesByIDs(data, field.value).map((item) => {
                  return (
                    <ListItem key={item.id} sx={{ width: "auto", p: "0 5px" }}>
                      <Chip
                        id={item.id}
                        color="primary"
                        label={item.name}
                        onDelete={(e) => selectHandle(e, false, item.id, field)}
                      />
                    </ListItem>
                  );
                })}
              </FlexBox>
            </FlexBox>
          )}
        ></Controller>
      </FlexBox>
    </Paper>
  );
};

export default TreeSelector;
