module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '7232e00db1337d80814bd5830ed8d425'),
  },
});
