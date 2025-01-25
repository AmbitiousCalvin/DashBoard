import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { createTheme, useColorScheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import PaidIcon from "@mui/icons-material/Paid";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";

function CustomThemeSwitcher() {
  const { setMode } = useColorScheme();

  const handleThemeChange = React.useCallback(
    (event) => {
      setMode(event.target.value);
    },
    [setMode]
  );

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);

  const toggleMenu = React.useCallback(
    (event) => {
      setMenuAnchorEl(isMenuOpen ? null : event.currentTarget);
      setIsMenuOpen((previousIsMenuOpen) => !previousIsMenuOpen);
    },
    [isMenuOpen]
  );

  return (
    <React.Fragment>
      <Tooltip title="Settings" enterDelay={1000}>
        <div>
          <IconButton type="button" aria-label="settings" onClick={toggleMenu}>
            <SettingsIcon />
          </IconButton>
        </div>
      </Tooltip>
      <Popover
        open={isMenuOpen}
        anchorEl={menuAnchorEl}
        onClose={toggleMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        disableAutoFocus
      >
        <Box sx={{ p: 2 }}>
          <FormControl>
            <FormLabel id="custom-theme-switcher-label">Theme</FormLabel>
            <RadioGroup
              aria-labelledby="custom-theme-switcher-label"
              defaultValue="system"
              name="custom-theme-switcher"
              onChange={handleThemeChange}
            >
              <FormControlLabel
                value="light"
                control={<Radio />}
                label="Light"
              />
              <FormControlLabel
                value="system"
                control={<Radio />}
                label="System"
              />
              <FormControlLabel value="dark" control={<Radio />} label="Dark" />
            </RadioGroup>
          </FormControl>
        </Box>
      </Popover>
    </React.Fragment>
  );
}

const NAVIGATION = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "orders",
    title: "Orders",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "tasks",
    title: "Tasks",
    icon: <ListAltIcon />,
  },
  {
    segment: "budgets",
    title: "Budgets",
    icon: <PaidIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBranding(props) {
  const router = useDemoRouter("/dashboard");

  const [session, setSession] = React.useState({
    user: {
      name: "Bharat Kashyap",
      email: "bharatkashyap@outlook.com",
      image: "https://avatars.githubusercontent.com/u/19550456",
    },
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: "Bharat Kashyap",
            email: "bharatkashyap@outlook.com",
            image: "https://avatars.githubusercontent.com/u/19550456",
          },
        });
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  return (
    // preview-start
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      branding={{
        logo: (
          <DashboardCustomizeIcon
            fontSize="large"
            titleAccess="Your All in one Dashboard"
            color="primary"
          />
        ),
        title: "Dashboard",
        homeUrl: "/dashboard",
      }}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout
        slots={{
          toolbarActions: CustomThemeSwitcher,
        }}
      >
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}

export default DashboardLayoutBranding;
