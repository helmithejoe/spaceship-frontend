import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    minWidth: 275,
  },
  inline: {
    display: 'inline',
  },
}));

export default function OnlineList(props) {
  const classes = useStyles();
    //alert(props.parentContext.state.onlineUsers);
    //props.fetchOnlineUsers();
    //.then(function(){
    return props.parentContext.state.onlineUsers.map(function(item, i) {
         return (
            <List className={classes.root}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={item.first_name + ' ' + item.last_name}><PersonIcon /></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.first_name + ' ' + item.last_name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        
                      </Typography>
                      {item.bio}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          );
        });
    //});
}
