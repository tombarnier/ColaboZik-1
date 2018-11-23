import React, {Component} from 'react'
import {View, FlatList} from 'react-native'
import {Fab, Icon} from 'native-base'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import allTheActions from '../actions'
import {app} from '../actions/auth'

import PlaylistCard from '../components/playlistCard'

const ScrollPlaylists = styled.ScrollView`
  padding: 10px;
`

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    playlists: PropTypes.array
  }

  state = {
    playlists: []
  }

  _playlistCard = ({item}) =>
    <PlaylistCard playlist={item} navigation={this.props.navigation}/>

  componentDidMount() {
    const { actions } = this.props
    actions.auth.getPlaylists().then((response) => {
      console.log(response.data)
      this.setState({
        playlists: response.data
      })
    })
  }

  render() {
    const {navigation} = this.props

    return (
      <View style={{flex: 1}}>
        <ScrollPlaylists>
          <FlatList data={this.state.playlists}
                    renderItem={this._playlistCard}
                    keyExtractor={(item) => item._id}/>
        </ScrollPlaylists>

        <Fab
          style={{backgroundColor: '#5067FF'}}
          position="bottomRight"
          onPress={() => navigation.navigate('AddPlaylist')}>
          <Icon name="add"/>
        </Fab>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    auth: bindActionCreators(allTheActions.auth, dispatch)
  }
})

const mapStateToProps = state => {
  return {
    accessToken: state.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
