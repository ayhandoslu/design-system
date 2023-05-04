import { MemoryRouter } from 'react-router-dom';
import { Preview } from '@storybook/react';

import { VisuallyHidden, Box, darkTheme, lightTheme } from '@strapi/design-system';

import { createCustomTheme } from './utils/createCustomTheme';
import Theme from './components/Theme';

const preview: Preview = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Theme>
          <main>
            <VisuallyHidden>
              {/* Necessary in order to prevent axe core from providing errors on main / heading */}
              <h1>Storybook story</h1>
            </VisuallyHidden>
            <Box height="100%" padding={2}>
              <Story />
            </Box>
          </main>
        </Theme>
      </MemoryRouter>
    ),
  ],
  parameters: {
    options: {
      storySort: {
        order: ['Design System', ['Primitives', 'Technical Components', 'Components']],
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    darkMode: {
      // Override the default dark theme
      dark: createCustomTheme({ theme: darkTheme, asStorybookTheme: false }),
      // Override the default light theme
      light: createCustomTheme({ theme: lightTheme, asStorybookTheme: false }),
    },
  },
};

export default preview;
