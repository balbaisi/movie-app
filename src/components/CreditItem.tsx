import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export interface Props {
  castImage: any;
  cast: any;
}

interface State {}

export class CreditItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.castContainer}>
        <View style={styles.row}>
          <View style={[styles.col, {flex: 1}]}>
            <View style={[styles.creditContainer, styles.elevation]}>
              <Image style={[styles.castImage]} source={this.props.castImage} />
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.col, {flex: 1}]}>
            <Text style={styles.castName}>{this.props.cast.name}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  castContainer: {
    marginRight: 20,
    marginLeft: 5,
  },
  creditContainer: {
    backgroundColor: 'white',
    marginVertical: 10,
    width: 75,
    height: 75,
    borderRadius: 25 + 12.5,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  castImage: {
    width: 75,
    height: 75,
    borderRadius: 25 + 12.5,
  },
  castName: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    flexWrap: 'nowrap',
    width: 70,
  },
  elevation: {
    elevation: 10,
    shadowColor: 'rgb(38,37,37)',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  col: {
    flexDirection: 'column',
  },
});
