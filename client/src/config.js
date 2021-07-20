const config = {
  ENV: import.meta.env.MODE,
  BASE_URL: import.meta.env.VITE_BASE_URL,
  OA_ID: import.meta.env.VITE_OA_ID,
  DEFAULT_ACCESS_TOKEN: import.meta.env.VITE_DEFAULT_ACCESS_TOKEN
}

export default config