import { bindActionCreators } from 'redux'
import { Button, Icon } from 'native-base'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import allTheActions from '../../actions'

class DislikeButton extends Component {
  static propTypes = {
    actions: PropTypes.object,
    music: PropTypes.object,
    playlist: PropTypes.object,
    user: PropTypes.object
  }

  _downVote = () => {
    const { actions, music, playlist, user } = this.props

    actions.musics.downvoteMusic(music, playlist, user)
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
  playlist: state.playlists.currentPlaylist,
  user: state.feathers.user
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DislikeButton)
