// Package imports
import { createStore, SetStoreFunction } from 'solid-js/store'

// Types
export type Theme = {
  id: ThemeOptions
  bg1: string
  bg2: string
  bg3: string
  footer: string
  text: string
  textHighlighted: string
  textInactive: string
  textFooter: string
  textFooterBold: string
  primary1: string
  primary2: string
  border: string
}

export const themes: { [theme: string]: Theme } = {
  dark: {
    id: 'dark',
    bg1: '#0D1018',
    bg2: '#15171F',
    bg3: '#232427',
    footer: '#E2E3E5',
    text: '#EEEEEE',
    textHighlighted: '#82DEF5',
    textInactive: '#888D98',
    textFooter: '#515358',
    textFooterBold: '#CACBD0',
    primary1: '#82DEF5',
    primary2: '#FDE38E',
    border: '#2F333E'
  }
}

class ThemeSys {
  state: Theme
  set: SetStoreFunction<Theme>

  constructor() {
    [this.state, this.set] = createStore<Theme>({ ...themes.dark })
  }

  setByThemeId(themeId: ThemeOptions) {
    this.set(themes[themeId])
  }
}

export const themeSys = new ThemeSys()
