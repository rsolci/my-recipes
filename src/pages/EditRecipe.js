import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import  { gql } from 'apollo-boost'

class EditRecipe extends Component {
  state = {
    name: '',
    servings: '',
    instructions: ''
  }

  handlePost = async e => {
    e.preventDefault()
    const { name, servings, instructions } = this.state
    await this.props.createRecipeMutation({
      variables: { name, servings, instructions },
    })
    this.props.history.replace('/recipes')
  }

  render() {
    return (
      <div className="pa4 flex justify-center bg-white">
        <form onSubmit={this.handlePost}>
          <h1>Write Recipe</h1>
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            onChange={e => this.setState({ name: e.target.value })}
            placeholder="Name"
            type="text"
            value={this.state.name}
          />
          <input
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            onChange={e => this.setState({ servings: e.target.value })}
            placeholder="Servings"
            type="text"
            value={this.state.servings}
          />
          <textarea
            className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
            cols={50}
            onChange={e => this.setState({ instructions: e.target.value })}
            placeholder="instructions"
            rows={8}
            value={this.state.instructions}
          />
          <input
            className={`pa3 bg-black-10 bn ${this.state.instructions &&
              this.state.name &&
              'dim pointer'}`}
            disabled={!this.state.name || !this.state.instructions}
            type="submit"
            value="Create"
          />
          <a className="f6 pointer" onClick={this.props.history.goBack}>
            or cancel
          </a>
        </form>
      </div>
    )
  }
}

const CREATE_RECIPE_MUTATION = gql`
  mutation CreateRecipeMutation($name: String!, $servings: String, $instructions: String!) {
    createRecipe(name: $name, servings: $servings, instructions: $instructions) {
      id
      name
    }
  }
`

const RecipePageWithMutation = graphql(CREATE_RECIPE_MUTATION, {
  name: 'createRecipeMutation',
})(EditRecipe)


export default withRouter(RecipePageWithMutation);