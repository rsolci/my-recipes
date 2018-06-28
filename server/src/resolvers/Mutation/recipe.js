const { getUserId } = require('../../utils')

const recipe = {
  async createRecipe(parent, { name, servings, instructions, ingredients }, ctx, info) {
    const userId = getUserId(ctx)
    return ctx.db.mutation.createRecipe(
      {
        data: {
          name,
          servings,
          instructions,
          ingredients,
          owner: {
            connect: { id: userId },
          },
        },
      },
      info
    )
  }
}

module.exports = { recipe }