export const APP_NAME = 'PortalX'
export const APP_TITLE = 'Student Portal'
export const APP_HEADLINE = 'The Future of Student Management'
export const APP_DESCRIPTION = 'A next-generation platform for managing students, tracking data, and streamlining academic workflows — built for speed, clarity, and scale.'

export const STORAGE_KEY = 'portalx_students'

export const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/students', label: 'Students' },
  { path: '/add', label: 'Add Student' },
  { path: '/counter', label: 'Counter' },
]

export const API_USERS_URL = 'https://jsonplaceholder.typicode.com/users'
export const API_USERS_LIMIT = 10

export const FORM_LABELS = {
  name: 'Full Name',
  email: 'Email Address',
  phone: 'Phone Number',
  gender: 'Gender',
  submit: 'Add Student',
}

export const EMPTY_STATE_MESSAGE = 'No students added yet.'
export const CTA_TEXT = 'Add Your First Student'
export const ERROR_GENERIC = 'Something went wrong. Please try again.'

export const COUNTER_INITIAL = 0

export const HOME_FEATURES = [
  {
    title: 'Student Directory',
    description: 'Browse, search, and manage your complete student roster with real-time data synced from the network.',
    icon: 'Users',
    link: '/students',
    linkText: 'View Students',
  },
  {
    title: 'Quick Registration',
    description: 'Add new students instantly with validated forms, smart defaults, and immediate confirmation feedback.',
    icon: 'UserPlus',
    link: '/add',
    linkText: 'Add Student',
  },
  {
    title: 'Data Tracking',
    description: 'Interactive counters with data-driven visuals. Track, increment, and analyze metrics in real time.',
    icon: 'BarChart3',
    link: '/counter',
    linkText: 'Open Counter',
  },
]

export const HOME_WORKFLOW = [
  { step: '01', title: 'Register', description: 'Fill out the student form with validated fields for name, email, phone, and gender.' },
  { step: '02', title: 'Browse', description: 'View all students in a responsive card grid pulled from live API data.' },
  { step: '03', title: 'Track', description: 'Use interactive counters and visualizations to track key metrics in real time.' },
]
