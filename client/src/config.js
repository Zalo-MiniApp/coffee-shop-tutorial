const env = import.meta.env.MODE || 'development';
const config = {
  development: {
    BASE_URL: 'http://localhost:5000',
    OA_ID: '4318657068771012646',
    DEV_TOKEN: 'w6JtOrSEZM_lOV9WKWc8Q-faysPH5_Tfj23f2NvBnNkgOyqnPKooOPv_p6XMIx4Aktc8SdndZpkTKlDOTL3bKyWWv0O8Eff6wr63CbuwXaQ19R05E2_E2F02rtaJRVPqhq7xF4bqv72J6EOGM27YIO0Vz1XkBUrIgIVi6Nm--bUT9iK-I4woC_rtccWrV80UZ6kt2Mfrp7xUHhGA3MoaUEnWkIrPNiTxZr701ZPAoNVvUDuc5qVVQDzCqGWAKyTHlctu2bm6vW6u6F4FIunTJpfN5unh'
  },
  production: {
    BASE_URL: 'https://coffee-shop-server-api.herokuapp.com',
    OA_ID: '4318657068771012646'
  }
}

export default config[env];