const env = import.meta.env.MODE || 'development';
const config = {
  development: {
    BASE_URL: 'http://localhost:5000',
    OA_ID: '4318657068771012646',
    DEV_TOKEN: 'pj3zVMX3Y7V9rVX-RKIDSypG-NXkMlfoWxpv2djYpts7YTihNa7ZNeMXxn1KLTSOXwMWNN1NsHE1jzLiMoUuP8tMgJ5jD9v4ZFFe5rKWzs25qFKbUXA1BwNlabP5BA4WuD6rPXWKs6lFwCa0B03zJUFSZ38C5O90gjYFFtGzeqsGtxKWRmo5LilRh1jhIRfEbTseD3aii6NKqhW3T2UTTedMx1LNAEHBiSBo8r41or7ntSSlL2xmTwt__oPm2CzJXkBP828Le7s1WvHt8rMG55TDbQH0F6XQYNC'
  },
  production: {
    BASE_URL: 'https://coffee-shop-server-api.herokuapp.com',
    OA_ID: '4318657068771012646'
  }
}

export default config[env];