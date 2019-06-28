import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 25
      
  },
});

export default function Nav(props) {
  const classes = useStyles();
    
  const [value, setValue] = React.useState(parseInt(props.navChild));

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        
        // if the menu changed then change the page screen and title accordingly
        if(newValue == 0) {
            props.parentContext.setState({currentScreen : props.parentContext.state.profileScreen});
            props.parentContext.setState({title : 'My Profile'});
        } else if(newValue == 1) {
            props.parentContext.setState({currentScreen : props.parentContext.state.onlineScreen});
            props.parentContext.setState({title : 'Who Is Online'});
            
            props.parentContext.fetchOnlineUsers();
        } else if(newValue == 2) {
            
            // stop updating activity when logout
            clearInterval(props.parentContext.state.interval);
            
            // actual logout mechanism
            localStorage.clear();
            window.location.href = '/';
        }
        
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="My Profile" icon={<AccountCircleIcon />} />
      <BottomNavigationAction label="Who Is Online" icon={<SupervisedUserCircleIcon />} />
      <BottomNavigationAction label="Logout" icon={<PowerSettingsNewIcon />} />
    </BottomNavigation>
  );
}
