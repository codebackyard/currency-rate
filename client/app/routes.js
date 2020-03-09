import { LoginPage, RegisterPage, ProfilePage, HomePage } from 'containers';

export default {
  login: {
    path: '/login',
    component: LoginPage,
  },
  register: {
    path: '/register',
    component: RegisterPage,
  },
  profile: {
    path: '/profile',
    component: ProfilePage,
    private: true,
  },
  home: {
    path: '/',
    component: HomePage,
  },
};
