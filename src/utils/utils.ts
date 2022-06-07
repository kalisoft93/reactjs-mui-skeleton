import { CommonSelectorData } from "components/shared/CommonSelector";
import { TreeFetcherResp, TreeSelectorData } from "components/shared/TreeSelector";

export const isNullOrUndefined = (value) => {
  return value === null || value === undefined;
};

export const categoryTreeMap = (nodes: TreeFetcherResp[]): TreeSelectorData[] => {

  const result = [];
  nodes.forEach((node) => {
    const newNode = <TreeSelectorData> {id: node.id.toString(), name: node.title, children: []};
    if (node.subcategories && node.subcategories.length > 0){
      newNode.children = categoryTreeMap(node.subcategories);
    }
    result.push(newNode);
  });

  return result;
}

export const selectorDefaultMap = (rawData: any[]): CommonSelectorData[] => {
  return rawData.map((item) => <CommonSelectorData> {
    id: item.id,
    title: item.label
  });
}

export const getNodesByIDs = (nodes: TreeSelectorData[], nodeIds: any[]): TreeSelectorData[] => {
  let result = [];
  nodes.forEach((node) => {
    if (node.children && node.children.length > 0)
      result = result.concat(getNodesByIDs(node.children, nodeIds));
    if (nodeIds.includes(node.id)){
      result.push(node);
    }
  });

  return result;
}