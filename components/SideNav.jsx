import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import { Divider, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setToken } from "../store/userSlice";

export default function SideNav() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    dispatch(setToken(null));
    handleNavTo("/auth");
  };

  const handleNavTo = (page) => () => {
    router.push(page)
  }

  return (
    <React.Fragment>
      <ListItemButton sx={{ bgcolor: "whitesmoke", mt:-1 }}>
        <Typography sx={{fontSize: 12, opacity: 0.6}}>Main Navigation</Typography>
      </ListItemButton>
      <ListItemButton onClick={handleNavTo('/')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Beranda" />
      </ListItemButton>
      <ListItemButton onClick={handleNavTo('/barang_masuk')}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Barang Masuk" />
      </ListItemButton>
      <ListItemButton onClick={handleNavTo('/barang_keluar')}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Barang Keluar" />
      </ListItemButton>
      <ListItemButton sx={{ bgcolor: "whitesmoke" }}>
        <Typography sx={{fontSize: 12, opacity: 0.6}}>Options</Typography>
      </ListItemButton>
      <ListItemButton onClick={handleNavTo('/admin')}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Admin" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Pengaturan" />
      </ListItemButton>
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </React.Fragment>
  );
}
