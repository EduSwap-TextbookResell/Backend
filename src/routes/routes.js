import testRouter from './test.route.js';

export default (app) => {
  app.get('/', (req, res) => {
    res.json({ message: 'ok' });
  });

  app.use('/test', testRouter);

  /* Error handler middleware */
  app.use((err, req, res, _) => {
    const statusCode = err.statusCode || 500;
    console.error('Error:', err.message, err.stack);
    res
      .status(statusCode)
      .json({ message: err.message || 'Internal Server Error' });
  });
};
