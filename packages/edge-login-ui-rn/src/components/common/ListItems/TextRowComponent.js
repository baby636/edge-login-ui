// @flow

import { type EdgeRecoveryQuestionChoice } from 'edge-core-js'
import * as React from 'react'
import { Text, TouchableHighlight } from 'react-native'

import * as Constants from '../../../constants/index.js'
import { scale } from '../../../util/scaling.js'

export type OwnProps = {
  numberOfLines: number,
  title: string,
  data: EdgeRecoveryQuestionChoice
}
export type DispatchProps = {
  onPress(choice: EdgeRecoveryQuestionChoice): void
}

type State = {
  pressed: boolean
}

type Props = OwnProps & DispatchProps
class TextRowComponent extends React.Component<Props, State> {
  numberOfLines: number
  constructor(props: Props) {
    super(props)
    this.state = {
      pressed: false
    }
    this.numberOfLines = this.props.numberOfLines || 1
  }

  handlePressButton = () => {
    this.props.onPress(this.props.data)
  }

  handleShowUnderlay = () => {
    this.setState({
      pressed: true
    })
  }

  handleHideUnderlay = () => {
    this.setState({
      pressed: false
    })
  }

  render() {
    const { container, text, textPressed, underlayColor } = styles
    return (
      <TouchableHighlight
        style={container}
        onPress={this.handlePressButton}
        onShowUnderlay={this.handleShowUnderlay}
        onHideUnderlay={this.handleHideUnderlay}
        underlayColor={underlayColor}
      >
        <Text
          style={[text, this.state.pressed && textPressed]}
          ellipsizeMode="middle"
          numberOfLines={this.numberOfLines}
        >
          {this.props.title}
        </Text>
      </TouchableHighlight>
    )
  }
}

const styles = {
  container: {
    width: '100%',
    padding: scale(10)
  },
  text: {
    fontSize: scale(14),
    color: Constants.GRAY_1
  },
  textPressed: {
    fontSize: scale(14),
    color: Constants.BLACK
  },
  underlayColor: Constants.GRAY_3
}

export { TextRowComponent }
