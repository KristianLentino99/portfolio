import type { Preview } from '@storybook/react-vite'
import { initialize, mswLoader } from 'msw-storybook-addon'

import '../src/styles.css'

initialize({ onUnhandledRequest: 'bypass' })

// Inject Google Fonts (Space Grotesk + Bangers) as they're loaded via <link>
// in index.html and Storybook won't pick them up automatically.
const fontLink = document.createElement('link')
fontLink.rel = 'stylesheet'
fontLink.href =
  'https://fonts.googleapis.com/css2?family=Bangers&family=Space+Grotesk:wght@400;500;600;700&display=swap'
document.head.appendChild(fontLink)

const preview: Preview = {
  decorators: [
    (Story) => {
      // Set light theme by default; stories can override via parameters.theme
      document.documentElement.dataset.theme = 'light'
      return <Story />
    },
  ],
  loaders: [mswLoader],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    msw: {
      handlers: {},
    },
  },
}

export default preview