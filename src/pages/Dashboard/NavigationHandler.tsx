import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// TODO: Move this to a config file
const routes: Record<string, string> = {
  '1': '/dashboard/journey-tracker',
  '2': '/dashboard/routes',
  '3': '/dashboard/user-profile',
  '5': '/dashboard/service-hours-log',
  '6': '/dashboard/vehicles',
  '7': '/login',
};

const handleLogout = () => {
  Cookies.remove('userProfile');
  Cookies.remove('username');
  localStorage.removeItem('token');
}

const NavigationHandler = () => {
  const navigate = useNavigate();

  const handleRoute = (key: string) => {
    const route = routes[key];
    if (!route) {
      return;
    }
    navigate(route);
    if (route === '/login') {
      handleLogout();
    }
  }

  return handleRoute;
}

export default NavigationHandler;