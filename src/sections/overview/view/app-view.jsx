import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function AppView() {

  const title = {
    "admin":[
      {
        title:'Admin Dashboard'
      }
    ],
    "special need student":[
    {
      title:'Special Need Student Dashboard'
    }
    ],
    "part time student":[
      {
        title:'Part Time Student Dashboard'
      }
    ],
  }

  let user;
  const getuser = localStorage.getItem("login_status");
  if (getuser && getuser.length) {
    user = JSON.parse(getuser);
  }
    

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container sx={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        mt:25,
        textTransform:'uppercase',
      }}>
        {title[user.role].map((item) => (
        <Typography sx={{
          fontWeight:600,
          fontSize:40
        }}>
          {item.title}
        </Typography>
        ))}
      </Grid>
    </Container>
  );
}
