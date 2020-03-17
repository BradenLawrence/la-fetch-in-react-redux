import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getGroceries } from '../modules/groceries'
import { closeAlertMessage } from '../modules/alertMessage'

import AlertMessage from '../components/AlertMessage'
import Grocery from '../components/Grocery'

class GroceryListContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getGroceries()
  }

  render() {
    let groceries = this.props.groceryList.map((grocery) => {
      let id = grocery.id
      let name = grocery.name

      return (
        <Grocery
          key={id}
          name={name}
        />
      )
    })

    return (
      <div>
        <AlertMessage
          message={this.props.alertMessage}
          closeAlertMessage={this.props.closeAlertMessage}
          />
        <ul>
          {groceries}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    groceryList: state.groceries.groceryList,
    alertMessage: state.alertMessage.message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGroceries: () => dispatch(getGroceries()),
    closeAlertMessage: () => dispatch(closeAlertMessage())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroceryListContainer)
