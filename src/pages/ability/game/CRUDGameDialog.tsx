import {
    Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import FlexBox from "components/shared/FlexBox";
import { BaseCRUDDialogProps } from "components/shared/types/BaseCRUDDialogProps";
import useAbilityGames, { Game } from "hooks/ability/useAbilityGames";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import GameFormCenter from "./GameFormCenter";
import GameFormLeft from "./GameFormLeft";
import GameFormRight from "./GameFormRight";

type CRUDGameDialogProps = BaseCRUDDialogProps & {
  defaults?: Game;
};

type GameDialogInputs = {
  plan_categories: number[];
  ability_categories: number[];
  ability_tasks: number[];
  products: number[];
  roles: number[];
  tags: number[];
  media: number[];
  levels: number[];
  banner: number[];
  title: string;
  description: string;
  content: string;
  pedagogical_suggestion: string;
};

const CRUDGameDialog = ({
  callback,
  defaults,
  open,
  saveBtnLabel,
  ...rest
}: CRUDGameDialogProps) => {
  const notifier = useSnackbar();
  const { postGame, updateGame } = useAbilityGames();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<GameDialogInputs>({
    defaultValues: defaults || {
      plan_categories: [],
      ability_categories: [],
      ability_tasks: [],
      media: [],
      banner: [],
      tags: [],
      levels: [],
      roles: [],
      products: [],
    },
  });

  const onSubmit = (data: GameDialogInputs) => {
    let savePromise: Promise<any> = null;

    if (!defaults) {
      savePromise = postGame(data);
    } else {
      savePromise = updateGame(defaults.id, data);
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
                <GameFormLeft 
                  abilityCatProps={{control:control, controlName: "ability_categories"}}
                  planCategoriesProps={{control:control, controlName: "plan_categories"}}
                  levelsProps={{control: control, controlName: "levels"}}
                  roles={{control:control, controlName: "roles"}}
                  ></GameFormLeft>
              </FlexBox>
  
              <FlexBox flexDirection="column" rowGap="5px" flex="1 0 25%">
                <GameFormCenter
                  tagsProps={{control:control, controlName: "tags"}}
                  mediaProps={{control:control, controlName: "media"}}
                  bannerProps={{control:control, controlName: "banner"}}
                  productProps={{control: control, controlName: "products"}}
                  aTaskProps={{control: control, controlName: "ability_tasks"}}
                ></GameFormCenter>
              </FlexBox>
  
              <Box flex="1 1 auto">
                <Paper sx={{ p: "10px" }}>
                  <GameFormRight
                    titleProps={register("title")}
                    descriptionProps={register("description")}
                    contentProps={{control: control, controlName:"content"}}
                    pedagogicalSuggProps={register("pedagogical_suggestion")}
                  ></GameFormRight>
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

export default CRUDGameDialog;
