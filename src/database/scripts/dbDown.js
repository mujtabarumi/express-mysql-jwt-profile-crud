const { logger } = require("../../utility/logger");
const { dropDB: dropDBQuery } = require("../queries");

(() => {
  require("../../config/db.connect").query(dropDBQuery, (err, _) => {
    if (err) {
      logger.error(err.message);
      return;
    }
    logger.info("DB Dropped!");
    process.exit(0);
  });
})();
