import { Button, Icon } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import allTheActions from '../../actions'

class DislikeButton extends Component {
  static propTypes = {
    music: PropTypes.object,
    actions: PropTypes.object,
    user: PropTypes.object
  }

  _downVote = () => {
    const { actions, user, music } = this.props

    actions.musics.downvoteMusic(music, user)
  }

  render() {
    return (
      <Button danger transparent>
        <TouchableOpacity onPress={this._downVote}>
          <Icon name='thumbs-down'/>
        </TouchableOpacity>
      </Button>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    musics: bindActionCreators(allTheActions.musics, dispatch)
  }
})

const mapStateToProps = state => ({
  user: state.feathers.user
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DislikeButton)
