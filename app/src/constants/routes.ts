export const ROUTES = {
  HOME: '/',
  LANDING: '/',
  AUTH: '/auth',
  DASHBOARD: '/home',
  SESSION: '/session',
  JOURNEY_LIST: '/journey',
  JOURNEY: '/journey/:id',
  CALENDAR: '/calendar',
  HISTORY: '/history',
  SETTINGS: '/settings',
} as const

export const PUBLIC_ROUTES = [ROUTES.LANDING, ROUTES.AUTH]
export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.SESSION,
  ROUTES.JOURNEY_LIST,
  ROUTES.JOURNEY,
  ROUTES.CALENDAR,
  ROUTES.HISTORY,
  ROUTES.SETTINGS,
]
