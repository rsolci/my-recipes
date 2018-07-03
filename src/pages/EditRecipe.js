import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import  { gql } from 'apollo-boost'

class EditRecipe extends Component {
  state = {
    name: '',
    servings: '',
    instructions: '',
    ingredients: [],
    newQuantity: '',
    newIngredient: ''
  }

  addIngredient = () => {
    this.setState({
      ingredients: [...this.state.ingredients, {id: this.state.ingredients.length, quantity: this.state.newQuantity, description: this.state.newIngredient}],
      newIngredient: '',
      newQuantity: ''
    })
  }

  handlePost = async e => {
    e.preventDefault()
    const { name, servings, instructions } = this.state;
    const ingredients = {
      create: this.state.ingredients.map(ingredient => { return {quantity: ingredient.quantity, description: ingredient.description}})
    }
    await this.props.createRecipeMutation({
      variables: { name, servings, instructions, ingredients },
    })
    this.props.history.replace('/')
  }

  render() {
    return (
      <div className="pa4 flex justify-center bg-white">
        <form onSubmit={this.handlePost}>
          <h1>Write Recipe</h1>
          <input autoFocus className="w-100 pa2 mv2 br2 b--black-20 bw1"
            onChange={e => this.setState({ name: e.target.value })}
            placeholder="Name" type="text" value={this.state.name} />
          <input className="w-100 pa2 mv2 br2 b--black-20 bw1"
            onChange={e => this.setState({ servings: e.target.value })}
            placeholder="Servings" type="text" value={this.state.servings} />
          <textarea className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
            cols={50} onChange={e => this.setState({ instructions: e.target.value })}
            placeholder="instructions" rows={8} value={this.state.instructions} />
          <div>
            {this.state.ingredients.map(ingredient => {
              return <p key={ingredient.id}>{`${ingredient.quantity} - ${ingredient.description}`}</p>
            })}
            <div>
              <input className="w-20 pa2 mv2 br2 b--black-20 bw1" onChange={e => this.setState({ newQuantity: e.target.value })}
                placeholder="Quantity" type="text" value={this.state.newQuantity} />
              <input className="w-60 pa2 mv2 br2 b--black-20 bw1" onChange={e => this.setState({ newIngredient: e.target.value })}
                placeholder="Description" type="text" value={this.state.newIngredient} />
              <input className={`w-20 pa3 bg-black-10 bn ${this.state.newQuantity && this.state.newIngredient && 'dim pointer'}`}
                disabled={!this.state.newQuantity || !this.state.newIngredient} type="button" value="Add" onClick={this.addIngredient}/>
            </div>
          </div>
          <input className={`pa3 bg-black-10 bn ${this.state.instructions && this.state.name && 'dim pointer'}`}
            disabled={!this.state.name || !this.state.instructions} type="submit" value="Create" />
          <a className="f6 pointer" onClick={this.props.history.goBack}> or cancel </a>
        </form>
      </div>
    )
  }
}

const CREATE_RECIPE_MUTATION = gql`
  mutation CreateRecipeMutation($name: String!, $servings: String, $instructions: String!, $ingredients: IngredientCreateManyInput!) {
    createRecipe(name: $name, servings: $servings, instructions: $instructions, ingredients: $ingredients) {
      id
      name
    }
  }
`

const RecipePageWithMutation = graphql(CREATE_RECIPE_MUTATION, {
  name: 'createRecipeMutation',
})(EditRecipe)


export default withRouter(RecipePageWithMutation);