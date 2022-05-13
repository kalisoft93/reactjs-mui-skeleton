import { Email, Lock, LockOutlined, Password } from '@mui/icons-material';
import { Box, Button, Card, Icon, styled, TextField, Typography } from '@mui/material';
import FlexBox from '../../components/shared/FlexBox';
import useAuth from '../../hooks/authentication/useAuth';
import { useForm} from "react-hook-form";
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled(Box) ({
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to bottom , #f5f8fa, #ae4a84)'
});

const LoginCard = styled(Card) ({
    width: '300px',
    padding: '30px'
});

type LoginInputs = {
    email: string,
    password: string
}

const Login = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginInputs>({defaultValues: {email: 'test@ovped.hu', password: '123456789'}});
    
    const auth = useAuth();

    const navigate = useNavigate();

    const onSubmit = (data: LoginInputs) => {
        auth.login(data.email, data.password).then(() => {
            navigate("/");
        })
    }

    return (
        <LoginContainer>
            <LoginCard >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography sx={{textAlign: 'center', mb: '10px'}} variant="h5">
                        Bejelentkezés
                    </Typography>
                    <FlexBox sx={{alignItems: 'flex-end', columnGap: '10px'}}>
                        <Email></Email>
                        <TextField {...register('email',{required: true})} name="email" sx={{width: '100%'}} id="email" label="Email" variant="standard" />
                    </FlexBox>
                    <FlexBox sx={{alignItems: 'flex-end', columnGap: '10px'}}>
                        <LockOutlined></LockOutlined>
                        <TextField  {...register('password', {required: true})} name="password" sx={{width: '100%'}} id="password" type="password" label="Jelszó" variant="standard" />
                    </FlexBox>
                    <Box sx={{textAlign:'center', mt:'20px'}}>
                        <Button type="submit" variant="contained">Belépés</Button>
                    </Box>
                    </form>
            </LoginCard>
        </LoginContainer>
    )
}

export default Login;