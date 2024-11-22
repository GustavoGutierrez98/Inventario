import * as React from 'react';
import { auth, signOut } from '../../config/firebaseConfig';  // Asegúrate de que esta ruta sea correcta
import { useNavigate } from 'react-router-dom';  // Importa useNavigate si estás usando React Router
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function MenuComponent() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = React.useState(null);  // Estado para almacenar el usuario
  const [drawerOpen, setDrawerOpen] = React.useState(false);  // Estado para controlar el Drawer (Sidebar)
  const navigate = useNavigate();  // Hook para navegación

  // Obtener el usuario autenticado
  React.useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);  // Se ejecuta solo cuando el componente se monta

  // Manejo de apertura del menú de usuario
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // Función de logout
  const handleLogout = async () => {
    try {
      await signOut(auth);  // Cerrar sesión de Firebase Authentication
      navigate("/");  // Redirigir al usuario a la página de login (puedes cambiar la ruta según necesites)
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Manejo de apertura y cierre del Drawer (Sidebar)
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar sx={{ backgroundColor: '#ff5e01' }}> {/* Cambiar el color del AppBar aquí */}
        <Container maxWidth="xl">
          <Toolbar disableGutters>


            {/* IconButton para abrir el Sidebar (Drawer) */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}  // Abre el Sidebar al hacer clic
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {/* Aquí puedes agregar más opciones en el AppBar si es necesario */}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 0 }}>
              {user ? (
                <Typography sx={{ color: 'white', marginRight: 2 }}>
                  {user.displayName} {/* Mostrar el nombre del usuario */}
                </Typography>
              ) : (
                <Typography sx={{ color: 'white', marginRight: 2 }}>
                  Usuario no autenticado
                </Typography>
              )}

              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user ? user.displayName : 'Usuario'} src={user ? user.photoURL : '/static/images/avatar/2.jpg'} />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Sidebar (Drawer) */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}  // Cierra el Sidebar al hacer clic fuera de él
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer}  // Cierra el Sidebar cuando se hace clic en un item
          onKeyDown={toggleDrawer}
        >
          <Button fullWidth sx={{ padding: '20px', color: 'black' }}>Registro</Button>
          <Button fullWidth sx={{ padding: '20px', color: 'black' }}>Busqueda</Button>
          <Button
      fullWidth
      sx={{ padding: '20px', color: 'black' }}
      onClick={handleLogout} // Llamar a la función handleLogout al hacer clic
    >
      Salir
    </Button>
        </Box>
      </Drawer>
    </>
  );
}

export default MenuComponent;
