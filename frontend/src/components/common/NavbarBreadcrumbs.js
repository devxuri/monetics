import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

export default function NavbarBreadcrumbs() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  React.useEffect(() => {
    const uploadedStatements = JSON.parse(sessionStorage.getItem('uploadedStatements')) || [];
    if (uploadedStatements.length === 0) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Link to="/">
        <Typography variant="body1">Upload</Typography>
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography key={to} variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
            {capitalize(value)}
          </Typography>
        ) : (
          <Link key={to} to={to}>
            <Typography variant="body1">{capitalize(value)}</Typography>
          </Link>
        );
      })}
    </StyledBreadcrumbs>
  );
}