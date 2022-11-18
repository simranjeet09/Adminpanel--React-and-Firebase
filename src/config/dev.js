module.exports = {
    name: 'env.config',
    constants: {
        ENV: {
            FIREBASE_PROJECT_ID: process.env.REACT_APP_FIREBASE_PROJECT_ID,
            FIREBASE_API_KEY: process.env.REACT_APP_FIREBASE_API_KEY,
            FIREBASE_AUTH_DOMAIN: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
            FIREBASE_DATABASE_URL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
            FIREBASE_SENDER_ID:
                process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
            FIREBASE_APP_ID: process.env.REACT_APP_FIREBASE_APP_ID,
            FIREBASE_STORAGE_BUCKET:
                process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
            FIREBASE_MEASUREMENT_ID:
                process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
        },
    },
};
