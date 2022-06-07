import React, {PureComponent} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Movie} from '../interfaces/Movie';
import {MovieDetails} from '../interfaces/MovieDetails';
import {TheMovieAPI} from '../api/TheMovieAPI';

export interface Props {
  movie: Movie;
  details: MovieDetails;
  navigation: any;
}

export interface State {}

export class MovieListItem extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    let movie = this.props.movie;
    let details = this.props.details;

    if (!details) {
      return <View />;
    }

    let genres: any[] = [];
    details.genres.forEach(function (genre: any) {
      genres.push(
        <View style={[styles.col, styles.pill]}>
          <Text style={[styles.subMd]}>{genre.name}</Text>
        </View>,
      );
    });

    let rating = movie.vote_average ? movie.vote_average * 10 + '%' : 'N/A';

    return (
      <Pressable
        onPress={() => {
          this.props.navigation.navigate('Movie', {
            movie: movie,
            details: details,
            genres: genres,
          });
        }}>
        <View style={[styles.container, styles.elevation]}>
          <View style={[styles.row]}>
            <View style={[styles.col, styles.imageContainer, {flex: 1}]}>
              <Image
                source={{uri: TheMovieAPI.getImageUri(movie.poster_path)}}
                style={styles.movieImage}
              />
              <View style={[styles.rightView]}>
                <Text style={styles.ratingPill}>{rating}</Text>
              </View>
            </View>
            <View style={[styles.col, styles.imageContainer, {flex: 2}]}>
              <View style={styles.row}>
                <View style={[styles.col, {flex: 1}]}>
                  <Text style={styles.headerLg}>{movie.title}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={[styles.col, {flex: 1}]}>
                  <Text style={styles.subLg}>{movie.release_date}</Text>
                </View>
              </View>
              <View style={[styles.row, styles.marginTopSm]}>
                <View style={[styles.col, {flex: 1}]}>
                  <View style={[styles.row]}>{genres}</View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
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
    paddingTop: 25,
    paddingBottom: 25,
    marginVertical: 10,
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
    justifyContent: 'center',
  },
  movieImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  headerLg: {
    fontSize: 21,
  },
  subLg: {
    fontSize: 16,
  },
  subMd: {
    fontSize: 12,
    color: 'black',
    fontWeight: '600',
  },
  pill: {
    marginRight: 5,
    marginBottom: 5,
    padding: 5,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: 'rgba(164,164,164,0.4)',
    borderRadius: 20,
  },
  marginTopSm: {
    marginTop: 15,
  },
  rightView: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  ratingPill: {
    color: 'white',
    backgroundColor: '#579041',
    padding: 4,
    fontSize: 14,
    fontWeight: 'bold',
  },
  imageContainer: {
    height: 150,
  },
});
