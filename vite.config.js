import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    root: './src',
    base: '',
    plugins: [reactRefresh()],
  })
}
