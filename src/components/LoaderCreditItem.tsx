import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export interface Props {}

interface State {}

export class LoaderCreditItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container, styles.elevation]}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 10,
    width: 75,
    height: 75,
    borderRadius: 25 + 12.5,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  elevation: {
    elevation: 10,
    shadowColor: 'rgb(38,37,37)',
  },
});
