import React from 'react'
import Typography from '@material-ui/core/Typography'
import InternalLink from './InternalLink';

const MyDrawer = ({ }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: theme.palette.primary.main }}>
        <List style={{ padding: 0, marginTop: mobileOpen ? 10 : 75, flex: 1 }} subheader={<Typography variant='overline' style={{ color: navColor, fontWeight: 600, marginLeft: 18, marginBottom: 10 }}>Navigation</Typography>}>
          <ListItem button href='/' component={InternalLink}>
            <ListItemIcon style={{ minWidth: navPadding }}>{<HomeIcon style={{ color: navColor }} />}</ListItemIcon>
            <ListItemText disableTypography primary={<Typography variant='body2' style={{ color: navColor }}>Overview</Typography>} />
          </ListItem>
          {drawerNavConfig.map(nestedNavigation => {
            const Icon = nestedNavigation.icon
            const title = nestedNavigation.sectionTitle
            return (
              <NestedNavigation key={title} padding={navPadding} icon={<Icon style={{ color: navColor }} />} title={title} color={navColor}>
                {nestedNavigation.linkList.map(listItem => (
                  <ListItem key={listItem.name} button href={listItem.href} component={InternalLink}>
                    <ListItemText style={{ paddingLeft: navPadding }} inset disableTypography primary={<Typography variant='body2' style={{ color: navColor }}>{listItem.name}</Typography>} />
                  </ListItem>
                ))}
              </NestedNavigation>
            )
          })}
        </List>
        <Divider style={{ color: 'white' }} />
        <List>
          <ListItem
            button onClick={e => {
              e.preventDefault()
              client.resetStore()
              cookie.remove('token')
              setLoginData(null)
            }}
          >
            <ListItemIcon>{<Backspace style={{ color: navColor }} />}</ListItemIcon>
            <ListItemText disableTypography primary={<Typography variant='body2' style={{ color: navColor }}>Log Out</Typography>} />
          </ListItem>
        </List>
      </div>
    )
  }

  export default MyDrawer
