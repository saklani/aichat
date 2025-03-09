import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { config } from "dotenv";

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: { environment: 'node',  env:  {...config({ path: ".env" }).parsed},  }
})