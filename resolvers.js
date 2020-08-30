const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  Query: {
    getAllRecipes: async (root, args, { Recipe }) => {
      const allRecipes = await Recipe.find().sort({ createdDate: "desc" });
      return allRecipes;
    },

    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({
        username: currentUser.username,
      }).populate({
        path: "favourites",
        model: "Recipe",
      });
      return user;
    },
    getUserRecipes: async (root, args, { Recipe, currentUser }) => {
      if (!currentUser) {
        return null;
      }

      const userRecipes = await Recipe.find({
        username: currentUser.username,
      }).sort({ createdDate: "desc" });
      return userRecipes;
    },
    getRecipe: async (root, { id }, { Recipe }) => {
      const recipe = Recipe.findOne({ _id: id });
      return recipe;
    },

    searchRecipes: async (root, { searchTerm }, { Recipe }) => {
      if (searchTerm) {
        const searchResults = await Recipe.find(
          {
            $text: { $search: searchTerm },
          },
          {
            score: { $meta: "textScore" },
          }
        ).sort({
          score: { $meta: "textScore" },
        });

        return searchResults;
      }

      const recipes = await Recipe.find().sort({
        likes: "desc",
        createdDate: "desc",
      });
      return recipes;
    },
  },

  Mutation: {
    // For recipes
    addRecipe: async (
      root,
      { name, description, category, instructions },
      { Recipe, currentUser }
    ) => {
      const newRecipe = await new Recipe({
        name,
        description,
        instructions,
        category,
        username: currentUser.username,
      }).save();
      return newRecipe;
    },
    deleteUserRecipe: async (root, { id }, { Recipe }) => {
      const recipe = await Recipe.deleteOne({ _id: id });
      return recipe;
    },
    likeRecipe: async (root, { id }, { Recipe, User, currentUser }) => {
      const recipe = await Recipe.findOne({ _id: id });
      recipe.likes += 1;
      await recipe.save();

      const user = await User.findOne({ username: currentUser.username });
      user.favourites.push(id);
      await user.save();

      return recipe;
    },
    unLikeRecipe: async (root, { id }, { Recipe, User, currentUser }) => {
      const recipe = await Recipe.findOne({ _id: id });
      recipe.likes -= 1;
      await recipe.save();

      const user = await User.findOne({ username: currentUser.username });
      user.favourites.pull(id);
      await user.save();

      return recipe;
    },
    // for users
    signinUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new Error("User not found");
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("It seems password is invalid");
      }

      return { token: createToken(user, process.env.SECRET, "1hr") };
    },

    signupUser: async (root, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("User already exists");
      }
      const newUser = await new User({
        username,
        email,
        password,
      }).save();
      return { token: createToken(newUser, process.env.SECRET, "1hr") };
    },
  },
};
