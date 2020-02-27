import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';

const screenWidth = Dimensions.get('window').width;

function getWidth(screenWidth) {
  var cardWidth = screenWidth - 40;

  // iPad in portrait
  if (screenWidth >= 768) {
    // 20 each side = 40 + 20 in the middle
    cardWidth = (screenWidth - 60) / 2;
  }
  
  // iPad in landscape
  if (screenWidth >= 1024) {
    // 20 each side of middle = 40 + 20 of left side card + 20 of right side card
    cardWidth = (screenWidth - 80) / 3;
  }

  return cardWidth;
}

class Course extends React.Component {
  state = {
    cardWidth: getWidth(screenWidth),
  }

  componentDidMount() {
    Dimensions.addEventListener('change', this.adaptLayout);
  }

  adaptLayout = dimensions => {
    // console.log('dimensions', dimensions)
    this.setState({
      cardWidth: getWidth(dimensions.window.width),
    });
  }

  render() {
    const { image, logo, subTitle, title, avatar, caption, author } = this.props;

    return (
      <Container style={{ width: this.state.cardWidth }}>
        <Cover>
          <Image source={image} />
          <Logo source={logo} resizeMode="contain" />
          <SubTitle>{subTitle}</SubTitle>
          <Title>{title}</Title>
        </Cover>
        <Content>
          <Avatar source={avatar} />
          <Caption>{caption}</Caption>
          <Author>Taught by {author}</Author>
        </Content>
      </Container>
    )
  }
}

export default Course;

const Container = styled.View`
  width: 315px;
  height: 335px;
  background-color: white;
  margin: 10px 10px;
  border-radius: 14px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;

const Cover = styled.View`
  height: 260px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
  justify-content: flex-end;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Logo = styled.Image`
  width: 48px;
  height: 48px;
  position: absolute;
  top: 90px;
  left: 50%;
  margin-left: -24px; /* width / 2 */
`;

const SubTitle = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  margin-left: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: 600;
  margin-top: 4px;
  margin-bottom: 20px;
  margin-left: 20px;
  width: 170px;
`;

const Content = styled.View`
  padding-left: 62px;
  justify-content: center;
  height: 75px;
`;

const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  position: absolute;
  top: 20px;
  left: 20px;
  border-radius: 16px;
`;

const Caption = styled.Text`
  font-size: 14px;
  color: #3c4560;
  font-weight: 500;
`;

const Author = styled.Text`
  font-size: 13px;
  color: #b8bece;
  font-weight: 500;
  margin-top: 4px;
`;
