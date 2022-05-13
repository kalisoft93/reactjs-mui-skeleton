import { Box, styled } from '@mui/material';
import Sidebar from '../sidebar/Sidebar';

const AppLayoutWrapper = styled(Box) ({
    display:'flex',
    width: '100vw',
    height: '100vh',
})

const SidebarWrapper = styled(Box) ({
    flex: '0 0 auto',
    height: '100%'
});

const ContentWrapper = styled(Box) ({
    flex: '1 1 auto',
    height: '100%',
    background: 'rgba(0,0,0,0.1)'
});

const AppLayout = (props) => {

        return <>
            <AppLayoutWrapper>
               <SidebarWrapper>
                   <Sidebar></Sidebar>
               </SidebarWrapper>
               <ContentWrapper>
                    {props.children}
               </ContentWrapper>
           </AppLayoutWrapper>
        </>
}

export default AppLayout;