import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Modal from 'react-native-modal'
import { Button, Card, CardItem, Icon, Left, Right , Text} from 'native-base'

const StyledCard = styled(Card)`
  background-color: ${props => props.theme.color.foreground};
  border-color: ${props => props.theme.color.border};
`
const StyledCardItem = styled(CardItem)`
  background-color: ${props => props.theme.color.foreground};
  border-color: ${props => props.theme.color.border};
`

const StyledText = styled(Text)`
  color: ${props => props.theme.color.text};
  text-align: center;
`

const DangerButton = styled(Button)`
  background-color: ${props => props.theme.color.danger};
`

export default class ModalConfirm extends Component {
  static propTypes = {
    confirm: PropTypes.func,
    text: PropTypes.string,
    toggle: PropTypes.func,
    isVisible: PropTypes.bool
  }

  render() {
    const { confirm, text, toggle, isVisible } = this.props

    return (
      <Modal isVisible={isVisible}
             onBackdropPress={() => toggle(false)}>
        <StyledCard>
          <StyledCardItem>
            <StyledText>{text}</StyledText>
          </StyledCardItem>
          <StyledCardItem>
            <Left>
              <DangerButton iconLeft onPress={confirm}>
                <Icon name='trash'/>
                <Text>Supprimer</Text>
              </DangerButton>
            </Left>
            <Right>
              <Button light iconLeft onPress={() => toggle(false)}>
                <Icon name='close'/>
                <Text>Annuler</Text>
              </Button>
            </Right>
          </StyledCardItem>
        </StyledCard>
      </Modal>
    )
  }
}
