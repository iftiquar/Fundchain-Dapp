import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Profile',
    icon: 'person-outline',
    link: '/main/user-profile',
    home: true,
  },
  {
    title: 'Dashboard',
    icon: 'grid-outline',
    link: '/main/dashboard',
    home: true,
  },
  {
    title: 'Raise a Fund',
    icon: 'plus-outline',
    link: '/main/raise-fund',
    home: true
  },
  {
    title: 'ORGANIZATIONS',
    group: true,
  },
  {
    title: 'Education',
    icon: 'book-open-outline',
    link: '/main/education',
    home: true,
  },
  {
    title: 'Start Ups',
    icon: 'bulb-outline',
    link: '/main/startup',
    home: true,
  },
  {
    title: 'Old Age Homes',
    link: '/main/oldagehome',
    icon: 'home-outline',
    home: true,
  },
  {
    title: 'Health',
    link: '/main/health',
    icon: 'activity-outline',
    home: true,
  },
  {
    title: 'Rural Development',
    link: '/main/ruraldevelopment',
    icon: 'globe-2-outline',
    home: true,
  },
  {
    title: 'Nature',
    link: '/main/nature',
    icon: 'sun-outline',
    home: true,
  },
  {
    title: 'Farming',
    link: '/main/farming',
    icon: 'award-outline',
    home: true,
  },
  {
    title: 'Others',
    link: '/main/others',
    icon: 'plus-square-outline',
    home: true,
  },


];
