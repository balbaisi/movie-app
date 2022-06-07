import React, {PureComponent} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export interface Props {
  title?: string;
}

interface State {}

export class Header extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{this.props.title ?? ''}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginLeft: 10,
  },
  headerTitle: {
    padding: 10,
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
  },
});
