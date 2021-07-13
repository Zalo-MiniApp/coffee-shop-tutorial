const env = process.env.NODE_ENV || 'development';
const config = {
    development: {
        MONGODB_URL: process.env.MONGODB_URL,
        ZALO_APP_ID: process.env.ZALO_APP_ID,
        MINI_APP_ID: process.env.MINI_APP_ID
    },
    production: {
        MONGODB_URL: process.env.MONGODB_URL,
        ZALO_APP_ID: process.env.ZALO_APP_ID,
        MINI_APP_ID: process.env.MINI_APP_ID
    }
}

module.exports = config[env];