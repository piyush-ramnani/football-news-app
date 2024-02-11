const { zCreateUserInput, zCreatePostInput } = require("./types");

function userInputValidation(req, res, next) {
  const userInput = req.body;

  if (
    !userInput.firstName ||
    !userInput.lastName ||
    !userInput.username ||
    !userInput.password
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const validatedData = zCreateUserInput.safeParse(userInput);

  if (!validatedData.success) {
    return res.status(409).json({ message: "Wrong input type" });
  }

  req.userData = validatedData.data;
  next();
}

function createPostValidation(req, res, next) {
  const post = req.body;

  if (!(post.heading && post.media)) {
    return res
      .status(400)
      .json({ message: "Both heading and media is needed." });
  }

  const validatedPost = zCreatePostInput.safeParse(post);

  if (!validatedPost.success) {
    return res.status(422).send({ errors: validatedPost.error.details });
  }

  req.postData = validatedPost.data;
  next();
}

module.exports = {
  userInputValidation,
};
