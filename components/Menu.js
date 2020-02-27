import React from 'react'
import {
  Animated,
  TouchableOpacity,
  Dimensions,
  AsyncStorage
} from 'react-native'
import styled from 'styled-components'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import MenuItem from './MenuItem'

const { height: screenHeight, width: screenWidth } = Dimensions.get('window')
var cardWidth = screenWidth

if (screenWidth > 500) {
  cardWidth = 500
}

class Menu extends React.Component {
  state = {
    top: new Animated.Value(screenHeight)
  }

  componentDidMount() {
    this.toggleMenu()
  }

  componentDidUpdate() {
    this.toggleMenu()
  }

  toggleMenu = () => {
    if (this.props.action === 'openMenu') {
      Animated.spring(this.state.top, {
        toValue: 54
      }).start()
    } else if (this.props.action === 'closeMenu') {
      Animated.spring(this.state.top, {
        toValue: screenHeight
      }).start()
    }
  }

  handleMenu = index => {
    if (index === 3) {
      this.props.closeMenu()
      this.props.updateName('Unknown')
      this.props.updateAvatar(
        'https://p76.f0.n0.cdn.getcloudapp.com/items/OAuLlLWx/avatar-default.jpg?v=8cabc5ae8761a8f18fa00529a1d63c2e'
      )
      AsyncStorage.clear()
    }
  }

  render() {
    return (
      <AnimatedContainer style={{ top: this.state.top }}>
        <Cover>
          <Image source={require('../assets/background2.jpg')} />
          <Title>{this.props.name}</Title>
          <Subtitle>Designer at Dribble</Subtitle>
        </Cover>
        <TouchableOpacity
          onPress={this.props.closeMenu}
          style={{
            position: 'absolute',
            top: 120,
            left: '50%',
            marginLeft: -22,
            zIndex: 1
          }}
        >
          <CloseView>
            <Ionicons name="ios-close" size={44} color="#546bfb" />
          </CloseView>
        </TouchableOpacity>
        <Content>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => this.handleMenu(index)}
            >
              <MenuItem icon={item.icon} title={item.title} text={item.text} />
            </TouchableOpacity>
          ))}
        </Content>
      </AnimatedContainer>
    )
  }
}

function mapStateToProps(state) {
  return {
    action: state.action,
    name: state.name
  }
}

function mapDispatchToProps(dispatch) {
  return {
    closeMenu: () => dispatch({ type: 'CLOSE_MENU' }),
    updateName: name => dispatch({ type: 'UPDATE_NAME', name }),
    updateAvatar: avatar => dispatch({ type: 'UPDATE_AVATAR', avatar })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)

const Container = styled.View`
  position: absolute;
  background-color: white;
  /* width: 100%; */
  width: ${cardWidth}px;
  align-self: center;
  height: 100%;
  z-index: 100;
  border-radius: 10px;
  overflow: hidden;
`

const AnimatedContainer = Animated.createAnimatedComponent(Container)

const Cover = styled.View`
  height: 142px;
  background-color: black;
  justify-content: center;
  align-items: center;
`

const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`

const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: 600;
`

const Subtitle = styled.Text`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 8px;
`

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: white;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`

const Content = styled.View`
  height: ${screenHeight}px;
  background-color: #f0f3f5;
  padding: 50px;
`

const items = [
  {
    icon: 'ios-settings',
    title: 'Account',
    text: 'settings'
  },
  {
    icon: 'ios-card',
    title: 'Billing',
    text: 'payment'
  },
  {
    icon: 'ios-compass',
    title: 'Learn React',
    text: 'start course'
  },
  {
    icon: 'ios-exit',
    title: 'Log out',
    text: 'see you soon'
  }
]
