import { Button, Icon } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import allTheActions from '../../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


class DislikeButton extends Component {
  static propTypes = {
    music: PropTypes.object,
    actions: PropTypes.object
  }

  _downVote = (music) => {
    const { actions } = this.props

    actions.musics.downvoteMusic(music)
  }

  render() {
    const { music } = this.props

    return (
      <Button danger transparent>
        <TouchableOpacity onPress={() => this._downVote(music)}>
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

const mapStateToProps = state => {
  return state
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DislikeButton)
