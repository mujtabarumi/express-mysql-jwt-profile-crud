const { logger } = require("../../utility/logger");
const { createDB: createDBQuery } = require("../queries");

(() => {
  require("../../config/db.connect").query(createDBQuery, (err, _) => {
    if (err) {
      logger.error(err.message);
      return;
    }
    logger.info("DB created!");
    process.exit(0);
  });
})();
