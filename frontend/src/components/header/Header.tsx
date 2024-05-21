import LogoutButton from "@/src/components/LogoutButton";
import {RootState} from "@/store";
import styled from "@emotion/styled";
import Link from "next/link";
import {useRouter} from "next/router";
import React from 'react';
import {useSelector} from "react-redux";
import {SHeader} from './styles/SHeader';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

// const settings = [['Logout'];

const Logo = styled.img`
  width: 100px;
  height: auto;
  padding: 20px;
`;
export const Header: React.FC = () => {
  const {pathname} = useRouter()
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
  const {user} = useSelector((state: RootState) => state.user);
  
  
  const pages = [
    {label:'Studios', href:'/studios',show:true},
    {label:'My Studios', href:'/studios/mine',show:user?.user_type==='studio_owner'},
    {label:'Create Studio', href:'/studios/create',show:user?.user_type!=='customer'},
    {label:'Reservations', href:'/reservations',show:true},
    {label:'Past Reservations', href:'/reservations/past',show:true},
    {label:'cancelled Reservations', href:'/reservations/cancelled',show:true},
  ];
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  return (
    <SHeader>
      
      <AppBar position="fixed" sx={{background:'#fff', boxShadow:'0px 2px 4px -1px rgba(0,0,0,0.2)', color:'#11141A'}}>
        <Container maxWidth="md">
          <Toolbar disableGutters>
            <Logo src="/images/logo.png" alt="Logo" />
  
            <Box sx={{flexGrow: 1}}/>
              <Box sx={{flexGrow: 0}}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                  <Avatar alt="Remy Sharp" src="/images/avatar.png"/>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{mt: '45px'}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <LogoutButton/>
                  </MenuItem>
              </Menu>
            </Box>
  
  
            <Box sx={{flexGrow: 0}}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {pages.filter(({show})=>show).map(({label, href}) => (
                  <MenuItem key={href} onClick={handleCloseNavMenu}>
                    <Link href={href}><Typography textAlign="center" sx={{color: '#1EABE3', textDecoration:pathname===href?'underline':'none'}}>{label}</Typography></Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </SHeader>
  
  );
}
export default Header;
