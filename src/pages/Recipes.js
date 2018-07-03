import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import  { gql } from 'apollo-boost'
import { Link } from 'react-router-dom'

class Recipes extends Component {

  render() {
    if (this.props.recipeQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading...</div>
        </div>
      )
    }

    return (
      <Fragment>
        <h1>Recipes</h1>
        {this.props.recipeQuery.recipes &&
          this.props.recipeQuery.recipes.map(recipe => (
            <p key={recipe.id}><Link to={`recipe/${recipe.id}`} >{recipe.name}</Link></p>
          ))}
        {this.props.children}
      </Fragment>
    )
  }
}

const RECIPES_QUERY = gql`
  query RecipesQuery {
    recipes {
      id,
      name
    }
  }
`

export default graphql(RECIPES_QUERY, {
  name: 'recipeQuery', // name of the injected prop: this.props.feedQuery...
  options: {
    fetchPolicy: 'network-only',
  },
})(Recipes)