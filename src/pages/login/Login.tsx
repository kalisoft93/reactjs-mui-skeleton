import { Email, Lock, LockOutlined, Password } from '@mui/icons-material';
import { Box, Button, Card, Icon, styled, TextField, Typography } from '@mui/material';
import React from 'react';
import FlexBox from '../../components/shared/FlexBox';

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

const Login = () => {
    return (
        <LoginContainer>
            <LoginCard >
                    <Typography sx={{textAlign: 'center', mb: '10px'}} variant="h5">
                        Bejelentkezés
                    </Typography>
                    <FlexBox sx={{alignItems: 'flex-end', columnGap: '10px'}}>
                        <Email></Email>
                        <TextField sx={{width: '100%'}} id="input-email" label="Email" variant="standard" />
                    </FlexBox>
                    <FlexBox sx={{alignItems: 'flex-end', columnGap: '10px'}}>
                        <LockOutlined></LockOutlined>
                        <TextField sx={{width: '100%'}} id="input-password" label="Jelszó" variant="standard" />
                    </FlexBox>
                    <Box sx={{textAlign:'center', mt:'20px'}}>
                        <Button variant="contained">Belépés</Button>
                    </Box>
            </LoginCard>
        </LoginContainer>
    )
}

export default Login;