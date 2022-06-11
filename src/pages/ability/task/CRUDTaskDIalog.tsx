import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Paper,
  FormControl,
  InputLabel,
  Input,
  DialogActions,
  Button,
} from "@mui/material";
import CommonSelector from "components/shared/CommonSelector";
import FlexBox from "components/shared/FlexBox";
import TreeSelector from "components/shared/TreeSelector";
import { BaseCRUDDialogProps } from "components/shared/types/BaseCRUDDialogProps";
import useAbility from "hooks/ability/useAbility";
import useAbilityPurpose from "hooks/ability/useAbilityPurpose";
import useAbilityTask, { Task } from "hooks/ability/useAbilityTask";
import useCommon from "hooks/common/useCommon";
import usePlan from "hooks/plan/usePlan";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { categoryTreeMap, selectorDefaultMap, selectorFilterMap } from "utils/utils";

type CRUDTaskDialogProps = BaseCRUDDialogProps & {
  defaults?: Task;
};

type TaskDialogInputs = {
  plan_categories: number[];
  ability_categories: number[];
  ability_purposes: number[];
  roles: number[];
  title: string;
  description: string;
};

const CRUDTaskDialog = ({
  callback,
  defaults,
  open,
  saveBtnLabel,
  ...rest
}: CRUDTaskDialogProps) => {
  const notifier = useSnackbar();
  const { getAbilityCategories } = useAbility();
  const { getPurposeListData } = useAbilityPurpose();
  const { postTask, updateTask} = useAbilityTask();
  const { getPlanCategories } = usePlan();
  const { getRoleData } = useCommon();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<TaskDialogInputs>({
    defaultValues: defaults || {
      plan_categories: [],
      ability_categories: [],
      ability_purposes: [],
      roles: [],
    },
  });

  const onSubmit = (data: TaskDialogInputs) => {
    let savePromise: Promise<any> = null;

    if (!defaults) {
      savePromise = postTask(data);
    } else {
      savePromise = updateTask(defaults.id, data);
    }

    savePromise.then(() => {
      notifier.enqueueSnackbar("Sikeres mentés", { variant: "success" });
      callback(false);
    });
  };

  return (
    <Dialog
      open={open}
      {...rest}
      fullWidth={true}
      onClose={() => callback(false)}
    >
      <DialogTitle>{rest.title || "Fejlesztési feladat hozzaadás"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <FlexBox columnGap={1}>
            <FlexBox flexDirection="column" rowGap="5px" flex="1 0 50%">
              <TreeSelector
                control={control}
                required={false}
                title="Képesség kategória választó"
                controlName="ability_categories"
                fetcher={getAbilityCategories}
                mapper={categoryTreeMap}
              ></TreeSelector>
              <TreeSelector
                control={control}
                required={false}
                title="Terv kategória választó"
                controlName="plan_categories"
                fetcher={getPlanCategories}
                mapper={categoryTreeMap}
              ></TreeSelector>

              <CommonSelector
                fetcher={getRoleData}
                mapper={selectorDefaultMap}
                control={control}
                required={true}
                title="Role választó"
                placeholder="Role"
                controlName="roles"
              ></CommonSelector>
            </FlexBox>

            <Box flex="1 0 50%">
              <Paper sx={{ p: "10px" }}>
                <FormControl sx={{ width: "100%" }} variant="standard">
                  <InputLabel>Cím</InputLabel>
                  <Input
                    type="text"
                    name="title"
                    {...register("title", { required: true })}
                  ></Input>
                </FormControl>
                <FormControl sx={{ width: "100%" }} variant="standard">
                  <InputLabel>Leírás</InputLabel>
                  <Input
                    type="text"
                    multiline
                    rows={4}
                    name="description"
                    {...register("description", { required: true })}
                  ></Input>
                </FormControl>
                <CommonSelector
                  fetcher={getPurposeListData}
                  mapper={selectorFilterMap}
                  control={control}
                  required={true}
                  withFilter={true}
                  title="Cél választó"
                  placeholder="Cél"
                  controlName="ability_purposes"
                ></CommonSelector>
              </Paper>
            </Box>
          </FlexBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => callback(false)}>Mégse</Button>
          <Button color="success" type="submit">
            {saveBtnLabel || "Mentés"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CRUDTaskDialog;
