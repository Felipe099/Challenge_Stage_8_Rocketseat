module.exports = {
    jwt: {
        secret: process.env.AUTH_SECRET || 'default',
        expireIn: '1d',
    },
};
