import React, {Component} from 'react'
import {View, FlatList} from 'react-native'
import {Fab, Icon, List, ListItem} from 'native-base'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import allTheActions from '../actions'
import {app} from '../actions/auth'

import RoomCard from '../components/roomCard'

const ScrollRooms = styled.ScrollView`
  padding: 10px;
`

class ListRooms extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    rooms: PropTypes.array
  }

  state = {
    rooms: []
  }

  _roomCard = ({item}) =>
    <RoomCard room={item} navigation={this.props.navigation}/>

  componentDidMount() {

    const { actions } = this.props
    actions.auth.getPlaylists().then((response) => {
      console.log(response.data)
      this.setState({
        rooms: response.data
      })
    })
  }

  render() {
    const {navigation} = this.props

    return (
      <View style={{flex: 1}}>
        <ScrollRooms>
          <FlatList data={this.state.rooms}
                    renderItem={this._roomCard}
                    keyExtractor={(item) => item._id}/>
        </ScrollRooms>

        <Fab
          style={{backgroundColor: '#5067FF'}}
          position="bottomRight"
          onPress={() => navigation.navigate('AddRoom')}>
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
)(ListRooms)
