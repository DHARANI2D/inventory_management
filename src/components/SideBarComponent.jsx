import React, { useState } from "react";
import "../../public/styles/links.css";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  IconButton,
  Box,
} from "@mui/material";
import {
  HomeOutlined,
  Inventory2Outlined,
  SettingsOutlined,
  DescriptionOutlined,
  MonetizationOnOutlined,
  CardTravelOutlined,
  TrendingUpOutlined,
  PeopleAltOutlined,
  ExitToAppOutlined,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function SideBarComponent() {
  const navigate = useNavigate();
  const navigateTo = (to) => {
    navigate(to);
  };
  const location = useLocation();
  const currentPage = location.pathname;

  const sideBarComponent = [
    {
      title: "Home",
      component: <HomeOutlined fontSize="medium" color="primary" />,
    },
    {
      title: "Inventory",
      component: <Inventory2Outlined fontSize="medium" color="primary" />,
    },
    {
      title: "Orders",
      component: <CardTravelOutlined fontSize="medium" color="primary" />,
    },
    {
      title: "Customers",
      component: <PeopleAltOutlined fontSize="medium" color="primary" />,
    },
    {
      title: "Revenue",
      component: <MonetizationOnOutlined fontSize="medium" color="primary" />,
    },
    {
      title: "Growth",
      component: <TrendingUpOutlined fontSize="medium" color="primary" />,
    },
    {
      title: "Reports",
      component: <DescriptionOutlined fontSize="medium" color="primary" />,
    },
    {
      title: "Settings",
      component: <SettingsOutlined fontSize="medium" color="primary" />,
    },
    {
      title: "Logout",
      component: <ExitToAppOutlined fontSize="medium" color="primary" />,
    },
  ];

  const [selected, setSelected] = useState(0);

  const handlSelectedComponent = (event, index) => {
    setSelected(index);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clearing user session, redirecting to login page, etc.
    console.log("Logout clicked");
  };

  return (
    <>
      <List>
        {sideBarComponent.map((comp, index) => (
          <ListItem disablePadding dense={true} key={index}>
            <Box width="100%">
              <ListItemButton
                onClick={(event) => {
                  if (comp.title === "Logout") {
                    handleLogout();
                  } else {
                    handlSelectedComponent(event, index);
                    navigateTo(comp.title.toLocaleLowerCase());
                  }
                }}
                selected={
                  index === selected &&
                  currentPage === "/" + comp.title.toLowerCase()
                }
                sx={{
                  mb: 3,
                  borderLeft: 0,
                  borderColor: "primary.main",
                  ml: 1,
                }}
              >
                <ListItemIcon>
                  <IconButton>{comp.component}</IconButton>
                </ListItemIcon>
                <ListItemText
                  primary={comp.title}
                  primaryTypographyProps={{
                    fontSize: "medium",
                    fontWeight: selected === index ? "bold" : "",
                    color: selected === index ? "primary.main" : "inherit",
                  }}
                />
              </ListItemButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </>
  );
}
