const { getUserId } = require('../utils')

const Query = {
  feed(parent, args, ctx, info) {
    return ctx.db.query.posts({ where: { isPublished: true } }, info)
  },

  drafts(parent, args, ctx, info) {
    const id = getUserId(ctx)

    const where = {
      isPublished: false,
      author: {
        id
      }
    }

    return ctx.db.query.posts({ where }, info)
  },

  post(parent, { id }, ctx, info) {
    return ctx.db.query.post({ where: { id } }, info)
  },

  me(parent, args, ctx, info) {
    const id = getUserId(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  },

  recipes(parent, args, ctx, info) {
    const id = getUserId(ctx)
    return ctx.db.query.recipes({ where: { owner: { id } } }, info)
  },

  recipe(parent, args, ctx, info) {
    const userId = getUserId(ctx)
    const recipes = ctx.db.query.recipes({ where: { id: args.id, owner: { id: userId } } }, info);
    return recipes
  }
}

module.exports = { Query }
