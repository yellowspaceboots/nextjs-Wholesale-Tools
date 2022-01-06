import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import GmailTreeView from './TreeTest'

const ResponsiveDrawer = ({ drawerWidth, handleDrawerToggle, setMobileOpen, mobileOpen, drawerOpen, setDrawerOpen}) => {
    const drawer = (
        <>
            <Toolbar sx={{ height: 80, display: { xs: 'none', sm: 'block' } }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, pr: 1.3, pt: 1.3 }}>
                <GmailTreeView />  
            </Box>
        </>
    );
  return (
      <>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
        </>
  );
}

export default ResponsiveDrawer
