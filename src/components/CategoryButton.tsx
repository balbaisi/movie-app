import React, {PureComponent} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

export interface Props {
  title: string;
  name: string;
  selected: string;
  handler: any;
}

export interface State {
  selected: string;
  isSelected: boolean;
}

export class CategoryButton extends PureComponent<Props, State> {
  state = {
    selected: this.props.selected,
    isSelected: this.props.selected == this.props.name,
  };

  constructor(props: Props) {
    super(props);
  }

  componentDidUpdate() {
    this.setState({
      selected: this.props.selected,
    });
    this.setState({
      isSelected: this.props.selected === this.props.name,
    });
  }

  render() {
    return (
      <Pressable
        onPress={() => this.props.handler(this.props.name)}
        style={({pressed}) => [
          {
            backgroundColor:
              pressed || this.state.isSelected
                ? '#579041'
                : 'rgba(164,164,164,0.4)',
          },
          styles.button,
        ]}>
        {({pressed}) =>
          pressed || this.state.isSelected ? (
            <Text style={[styles.buttonPressed, {fontWeight: 'bold'}]}>
              {this.props.title}
            </Text>
          ) : (
            <Text style={[styles.buttonUnPressed, {fontWeight: 'bold'}]}>
              {this.props.title}
            </Text>
          )
        }
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 20,
  },
  buttonPressed: {
    fontSize: 18,
    color: 'white',
  },
  buttonUnPressed: {
    fontSize: 18,
    color: 'black',
  },
});
