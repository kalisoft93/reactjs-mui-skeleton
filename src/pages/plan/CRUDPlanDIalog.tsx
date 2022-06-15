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
import FlexBox from "components/shared/FlexBox";
import { BaseCRUDDialogProps } from "components/shared/types/BaseCRUDDialogProps";
import useMedia from "hooks/media/useMedia";
import usePlan, { PlanTask } from "hooks/plan/usePlan";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

import PlanTaskFormLeft from "./PlanTaskFormLeft";
import PlanTaskFormCenter from "./PlanTaskFormCenter";
import PlanTaskFormRight from "./PlanTaskFormRight";

type CRUDPlanTaskDialogProps = BaseCRUDDialogProps & {
  defaults?: PlanTask;
};

type PlanTaskDialogInputs = {
  plan_categories: number[];
  ability_categories: number[];
  ability_tasks: number[];
  products: number[];
  roles: number[];
  tags: number[];
  scopes: string;
  media: number[];
  levels: number[];
  banner: number[];
  title: string;
  description: string;
  content: string;
  pedagogical_suggestion: string;
};

const CRUDPlanTaskDialog = ({
  callback,
  defaults,
  open,
  saveBtnLabel,
  ...rest
}: CRUDPlanTaskDialogProps) => {
  const notifier = useSnackbar();
  const { postPlanTask, updatePlanTask } = usePlan();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<PlanTaskDialogInputs>({
    defaultValues: defaults || {
      plan_categories: [],
      ability_categories: [],
      ability_tasks: [],
      media: [],
      banner: [],
      tags: [],
      levels: [],
      roles: [],
      products: []
    },
  });

  const onSubmit = (data: PlanTaskDialogInputs) => {
    let savePromise: Promise<any> = null;

    if (!defaults) {
      savePromise = postPlanTask(data);
    } else {
      savePromise = updatePlanTask(defaults.id, data);
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
      <DialogTitle>{rest.title || "Tevékenység hozzaadás"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <FlexBox columnGap={1}>
            <FlexBox flexDirection="column" rowGap="5px" flex="1 0 25%">
              <PlanTaskFormLeft 
                abilityCatProps={{control:control, controlName: "ability_categories"}}
                planCategoriesProps={{control:control, controlName: "plan_categories"}}
                roles={{control:control, controlName: "roles"}}
                scopes={{control:control, controlName: "scopes"}}
                ></PlanTaskFormLeft>
            </FlexBox>

            <FlexBox flexDirection="column" rowGap="5px" flex="1 0 25%">
              <PlanTaskFormCenter
                tagsProps={{control:control, controlName: "tags"}}
                mediaProps={{control:control, controlName: "media"}}
                bannerProps={{control:control, controlName: "banner"}}
                levelsProps={{control: control, controlName: "levels"}}
                productProps={{control: control, controlName: "products"}}
                aTaskProps={{control: control, controlName: "ability_tasks"}}
              ></PlanTaskFormCenter>
            </FlexBox>

            <Box flex="1 1 auto">
              <Paper sx={{ p: "10px" }}>
                <PlanTaskFormRight
                  titleProps={register("title")}
                  descriptionProps={register("description")}
                  contentProps={{control: control, controlName:"content"}}
                  pedagogicalSuggProps={register("pedagogical_suggestion")}
                ></PlanTaskFormRight>
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

export default CRUDPlanTaskDialog;
