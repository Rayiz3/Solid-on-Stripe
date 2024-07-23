export const zIndex = {
  dropdown: 10,
  contentOverlay: 20,
  header: 50,
  mainOverlay: 55,
  popup: 1300
}

export const size = {
  space: {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    section: 40,
    main: 80
  },
  thickness: {
    sm: 1,
    md: 2,
    lg: 4,
    xl: 6
  },
  button: {
    sm: 16,
    md: 32,
    lg: 48,
    xl: 64,
    xxl: 88,
    select: 20,
    account: 36,
    outlined: { w: 400, h: 76 },
    long: 350
  },
  radius: {
    xs: 6,
    sm: 12,
    md: 15,
    lg: 20,
    xl: 24,
    circle: 100
  },
  fontSizes: {
    xxs: '1.2rem', // 12px / 10px = 1.2rem (only for notion, logout)
    xs: '1.4rem', // 14px / 10px = 1.4rem
    sm: '1.6rem', // 16px / 10px = 1.6rem
    md: '2.0rem', // 20px / 10px = 2.0rem
    lg: '2.4rem', // 24px / 10px = 2.4rem
    xl: '3.2rem', // 32px / 10px = 3.2rem
    xxl: '4.0rem' // 40px / 10px = 4.0rem (only for notion)
  },
  fontWeight: {
    normal: 500,
    semiBold: 600,
    bold: 800
  },
  lineHeight: {
    md: 1.5
  },
  transition: {
    fast: '0.5s ease',
    medium: '1.0s ease',
    slow: '1.2s ease'
  },
  opacity: {
    sm: 0.3,
    md: 0.5,
    lg: 0.7
  },
  brightness: {
    md: 1.5,
    lg: 2
  },
  header: { desktop: 80, mobile: 60 },
  select: { w: 130, h: 40 },
  popover: { w: 180 },
  video: { w: 1240, h: 698 },
  boxItem: { w: 245, h: 280 },
  vocalItem: {
    desktop: { w: 280, h: 280 },
    mobile: { w: 168, h: 168 }
  },
  vocalContent: {
    desktop: { w: 960, h: 720 },
    mobile: { w: 150, h: 200 }
  },
  content: {
    desktop: { w: 960, mw: 1240, pd: 170 },
    mobile: { w: 342, pd: 40 }
  },
  mockup: { desktop: 616, mobile: 330 },
  voxGradient: { desktop: 396, mobile: 220 },
  factoryGradient: { desktop: 396, mobile: 230 },
  footer: { desktop: 160, mobile: 330 },
  helpButton: { desktop: 50, mobile: 70 },
  help: { desktop: 1240, mobile: 320 }
}

export const breakpoints = {
  mobile: 0,
  studio: 880,
  desktop: size.content.desktop.mw
}

export const devices = {
  mobile: `screen and (min-width: ${breakpoints.mobile}px)`,
  desktop: `screen and (min-width: ${breakpoints.desktop}px)`
}
