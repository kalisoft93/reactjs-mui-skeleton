import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  FormControl,
  Input,
  InputLabel,
  Paper,
} from "@mui/material";
import CommonSelector from "components/shared/CommonSelector";
import FlexBox from "components/shared/FlexBox";
import TreeSelector from "components/shared/TreeSelector";
import { BaseCRUDDialogProps } from "components/shared/types/BaseCRUDDialogProps";
import useAbility from "hooks/ability/useAbility";
import useAbilityPurpose, { Purpose } from "hooks/ability/useAbilityPurpose";
import useCommon from "hooks/common/useCommon";
import usePlan from "hooks/plan/usePlan";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { categoryTreeMap, selectorDefaultMap } from "utils/utils";

type CRUDPurposeDialogProps = BaseCRUDDialogProps & {
  defaults?: Purpose;
};


type PurposeDialogInputs = {
  plan_categories: number[];
  ability_categories: number[];
  roles: number[];
  title: string;
  description: string;
};

const CRUDPurposeDialog = ({
  callback,
  defaults,
  open,
  saveBtnLabel,
  ...rest
}: CRUDPurposeDialogProps) => {
  
  const notifier = useSnackbar();
  const { getAbilityCategories } = useAbility();
  const { postPurpose, updatePurpose} = useAbilityPurpose();
  const { getPlanCategories } = usePlan();
  const { getRoleData } = useCommon();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<PurposeDialogInputs>({
    defaultValues: defaults || {  plan_categories: [], ability_categories: [], roles: [] },
  });

  const onSubmit = (data: PurposeDialogInputs) => {

    let savePromise: Promise<any> = null;

    if (!defaults) {
      savePromise = postPurpose(data);
    } else {
      savePromise = updatePurpose(defaults.id, data);
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
      <DialogTitle>{rest.title || "Fejlesztési cél hozzaadás"}</DialogTitle>
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
                controlName="roles"
              ></CommonSelector>
            </FlexBox>

            <Box flex="1 0 50%">
              <Paper sx={{ p: "10px" }}>
                <FormControl sx={{ width: "100%" }} variant="standard">
                  <InputLabel>
                    Cím
                  </InputLabel>
                  <Input
                    type="text"
                    name="title"
                    {...register("title", { required: true })}
                  ></Input>
                </FormControl>
                <FormControl sx={{ width: "100%" }} variant="standard">
                  <InputLabel>
                    Leírás
                  </InputLabel>
                  <Input
                    type="text"
                    multiline
                    rows={4}
                    name="description"
                    {...register("description", { required: true })}
                  ></Input>
                </FormControl>
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

export default CRUDPurposeDialog;
