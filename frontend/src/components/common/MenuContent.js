import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import FileUploadRounded from '@mui/icons-material/FileUploadRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';

const mainListItems = [
  { text: 'Upload', icon: <FileUploadRounded />, path: '/' },
  { text: 'Analytics', icon: <AnalyticsRoundedIcon />, path: '/analytics' },
  { text: 'Transactions', icon: <AssignmentRoundedIcon />, path: '/transactions' },
  { text: 'Chatbot', icon: <SmartToyRoundedIcon />, path: '/chatbot' },
];

const secondaryListItems = [
  { text: 'About', icon: <InfoRoundedIcon />, path: '/about' }
];

export default function MenuContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [uploadedStatements, setUploadedStatements] = React.useState([]);

  React.useEffect(() => {
    const statements = JSON.parse(sessionStorage.getItem('uploadedStatements')) || [];
    setUploadedStatements(statements);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => {
          if (item.text !== 'Upload' && uploadedStatements.length === 0) {
            return null;
          }
          return (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={() => handleNavigation(item.path)} selected={location.pathname === item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={() => handleNavigation(item.path)} selected={location.pathname === item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}