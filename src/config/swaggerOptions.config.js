export default {
  explorer: true,
  swaggerOptions: {
    urls: [
      {
        url: `${'http://localhost:3000'}/api/v1/docs/swagger.yaml`,
        name: 'v1',
      },
    ],
  },
}
