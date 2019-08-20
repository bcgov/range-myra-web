import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PlantCommunityActionRow from './PlantCommunityActionRow'
import { IMAGE_SRC } from '../../../constants/variables'

class PlantCommunityActionsBox extends Component {
  static propTypes = {
    plantCommunityActions: PropTypes.arrayOf(PropTypes.shape({})).isRequired
  }

  renderPlantCommunityAction = plantCommunityAction => {
    return (
      <PlantCommunityActionRow
        key={plantCommunityAction.id}
        plantCommunityAction={plantCommunityAction}
      />
    )
  }

  render() {
    const { plantCommunityActions } = this.props

    return (
      <div className="rup__plant-community__actions">
        <div className="rup__plant-community__actions__title">
          <img src={IMAGE_SRC.PLANT_COMMUNITY_ACTIONS_ICON} alt="action icon" />
          Actions to Establish / Maintain Communities / Other
        </div>
        <div className="rup__plant-community__action__header">
          <div>Action</div>
          <div>Details</div>
        </div>
        {plantCommunityActions.map(this.renderPlantCommunityAction)}
      </div>
    )
  }
}

export default PlantCommunityActionsBox
