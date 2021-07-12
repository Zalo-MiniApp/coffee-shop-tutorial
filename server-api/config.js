const env = process.env.NODE_ENV || 'development';
const config = {
    development: {
        mongodbUrl: ''
    },
    production: {
        mongodbUrl: ''
    }
}

module.exports = config[env];