import { Email, Lock, LockOutlined, Password } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
  InputLabel,
  styled,
  Typography,
} from "@mui/material";
import FlexBox from "../../components/shared/FlexBox";
import useAuth from "../../hooks/authentication/useAuth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled(Box)({
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(to bottom , #f5f8fa, #ae4a84)",
});

const LoginCard = styled(Card)({
  width: "300px",
  padding: "30px",
});

type LoginInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginInputs>({
    defaultValues: { email: "test@ovped.hu", password: "123456789" },
  });

  const auth = useAuth();

  const navigate = useNavigate();

  const onSubmit = (data: LoginInputs) => {
    auth.login(data.email, data.password).then(() => {
      navigate("/");
    });
  };

  return (
    <LoginContainer>
      <LoginCard>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography sx={{ textAlign: "center", mb: "10px" }} variant="h5">
            Bejelentkezés
          </Typography>
          <FlexBox sx={{flexDirection: 'column', rowGap:"5px"}}>
            <FlexBox sx={{ alignItems: "center", columnGap: "10px" }}>
              <FormControl
                sx={{ width: "100%" }}
                error={!!errors.email}
                variant="standard"
              >
                <InputLabel htmlFor={errors.email && "component-error"}>
                  Email
                </InputLabel>
                <Input
                  {...register("email", { required: true })}
                  aria-describedby="component-error-text"
                  endAdornment={
                    <InputAdornment position="end">
                      <Email />
                    </InputAdornment>
                  }
                />
                {errors.email && (
                  <FormHelperText>{errors.email?.message}</FormHelperText>
                )}
              </FormControl>
            </FlexBox>
            <FlexBox sx={{ alignItems: "center", columnGap: "10px" }}>
              <FormControl
                sx={{ width: "100%" }}
                error={!!errors.password}
                variant="standard"
              >
                <InputLabel htmlFor={errors.password && "component-error"}>
                  Password
                </InputLabel>
                <Input
                  {...register("password", { required: true })}
                  aria-describedby="component-error-text"
                  endAdornment={
                    <InputAdornment position="end">
                      <LockOutlined></LockOutlined>
                    </InputAdornment>
                  }
                />
                {errors.password && (
                  <FormHelperText>{errors.password?.message}</FormHelperText>
                )}
              </FormControl>
            </FlexBox>
          </FlexBox>

          <Box sx={{ textAlign: "center", mt: "20px" }}>
            <Button type="submit" variant="contained">
              Belépés
            </Button>
          </Box>
        </form>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
