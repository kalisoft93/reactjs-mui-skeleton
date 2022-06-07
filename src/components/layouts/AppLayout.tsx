import { Box, Card, styled, Typography } from "@mui/material";
import MainPageContainer from "components/shared/containers/MainPageContainer";
import Sidebar from "../sidebar/Sidebar";

const AppLayoutWrapper = styled(Box)({
  display: "flex",
  width: "100vw",
  height: "100vh",
});

const SidebarWrapper = styled(Box)({
  flex: "0 0 auto",
  height: "100%",
});

const ContentWrapper = styled(Box)({
  flex: "1 1 auto",
  height: "100%",
  background: "rgba(0,0,0,0.1)",
  overflow: "auto",
});

type AppLayoutProps = {
  children?: React.ReactNode;
  title?: string;
};

const AppLayout: React.FC<AppLayoutProps> = (props) => {
  return (
    <>
      <AppLayoutWrapper>
        <SidebarWrapper>
          <Sidebar></Sidebar>
        </SidebarWrapper>
        <ContentWrapper>
          {props.children && (
            <Card sx={{ m: "20px", overflow: "auto" }}>
              <Typography sx={{ p: "20px" }} variant="h6">
                {props.title}
              </Typography>
              <MainPageContainer>{props.children}</MainPageContainer>
            </Card>
          )}
        </ContentWrapper>
      </AppLayoutWrapper>
    </>
  );
};

export default AppLayout;
