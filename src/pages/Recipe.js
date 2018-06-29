import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import  { gql } from 'apollo-boost'

class Recipe extends Component {
  render() {
    if (this.props.recipeQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading...</div>
        </div>
      )
    }

    const { recipe } = this.props.recipeQuery;

    if (!recipe || recipe.length < 1) {
      return (
        // TODO redirect to 404
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>not found</div>
        </div>
      )
    }

    return (
      <div>
        <p>{recipe[0].id}</p>
        <p>{recipe[0].name}</p>
      </div>
    )
  }
}

const RECIPE_QUERY = gql`
  query RecipeQuery($id: ID!) {
    recipe(id: $id) {
      id,
      name
    }
  }
`

export default graphql(RECIPE_QUERY, {
  name: 'recipeQuery',
  options: props => ({
    variables: {
      id: props.match.params.id,
    },
  })
})(Recipe)
