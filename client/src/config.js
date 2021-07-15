const env = import.meta.env.MODE || 'development';
const config = {
  development: {
    BASE_URL: 'http://localhost:5000',
    OA_ID: '4318657068771012646',
    DEV_TOKEN: 'UGNXJ-ftYWn-0EHCxt2F27i5vKhiRlTDBrZkMlemuNSqAlXJmplqIJDCcW_ROgKmJd7CSQ4CrJ9s9B8caLQvFNbbgHgZLwTTHsQiPgiIW2PoEvjZunADTm45c73GEl9V82RWRyjKy5qWTlzPwahKOJX6laFSRjHwFcBSGlDqqNaX0i5wpH7FEI0N-27nDl8_91NE2yqUtIrKREGFat30Lt05yL3d1lbq2NBDCPfKtnH88UaakWBp4quKznR3CCfEKapzShjacc1IKePqkcESDbGne4LUTUfkYmW'
  },
  production: {
    BASE_URL: 'https://coffee-shop-server-api.herokuapp.com',
    OA_ID: '4318657068771012646'
  }
}

export default config[env];