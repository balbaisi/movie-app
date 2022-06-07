import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {CategoryButton} from './CategoryButton';

export interface Props {
  selected: string;
  control: any;
}

export interface State {
  selected: string;
}

export class Categories extends PureComponent<Props, State> {
  state = {
    selected: this.props.selected,
  };

  constructor(props: Props) {
    super(props);
    this.handler = this.handler.bind(this);
  }

  componentDidUpdate() {
    this.setState({
      selected: this.props.selected,
    });
  }

  handler(selection: string) {
    this.props.control(selection);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.col}>
            <CategoryButton
              handler={() => this.handler('upcoming')}
              title={'Upcoming'}
              name={'upcoming'}
              selected={this.state.selected}
            />
          </View>
          <View style={styles.col}>
            <CategoryButton
              handler={() => this.handler('popular')}
              title={'Popular'}
              name={'popular'}
              selected={this.state.selected}
            />
          </View>
          <View style={styles.col}>
            <CategoryButton
              handler={() => this.handler('topRated')}
              title={'Top Rated'}
              name={'topRated'}
              selected={this.state.selected}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  col: {
    flexDirection: 'column',
    textAlign: 'center',
    margin: 5,
    padding: 5,
  },
});
