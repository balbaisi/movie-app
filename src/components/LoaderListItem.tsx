import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, View, Text} from 'react-native';

export interface Props {}

interface State {}

export class LoaderListItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container, styles.elevation]}>
        <Text style={styles.headerLg}>Fetching your Movies!</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 8,
    padding: 7.5,
    paddingTop: 20,
    paddingBottom: 20,
    marginVertical: 10,
  },
  elevation: {
    elevation: 10,
    shadowColor: 'rgb(38,37,37)',
  },
  headerLg: {
    fontSize: 21,
    textAlign: 'center',
    margin: 10,
  },
});
