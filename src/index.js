const app = require("./app");
const { logger } = require("./utility/logger");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Running on PORT ${PORT}`);
});
