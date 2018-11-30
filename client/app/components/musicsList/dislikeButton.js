import { bindActionCreators } from 'redux'
import { Button, Icon } from 'native-base'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import allTheActions from '../../actions'

class DislikeButton extends Component {
  static propTypes = {
    music: PropTypes.object,
    actions: PropTypes.object,
    user: PropTypes.object,
    playlist: PropTypes.object
  }

  _downVote = () => {
    const { actions, user, music, playlist } = this.props

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
  user: state.feathers.user,
  playlist: state.playlists.currentPlaylist
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DislikeButton)
