const validatorHandler = (req, res, next, schema) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const groupedErrors = error.details.reduce((acc, err) => {
      const field = err.path.join(".");
      if (!acc[field]) {
        acc[field] = [];
      }
      acc[field].push(err.message);
      return acc;
    }, {});

    const formattedErrors = Object.keys(groupedErrors).map((field) => ({
      field,
      messages: groupedErrors[field],
    }));
    res.status(400).json({
      status: "error",
      message: formattedErrors,
    });
    return;
  }
  next();
};

module.exports = validatorHandler;
