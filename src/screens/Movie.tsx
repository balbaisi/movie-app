import React from 'react';
import {Image, StyleSheet, View, Text, ScrollView} from 'react-native';
import {LoaderCreditItem} from '../components/LoaderCreditItem';
import {CreditItem} from '../components/CreditItem';
import {TheMovieAPI} from '../api/TheMovieAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Props = {
  route: any;
  movie: any;
  details: any;
  genres: any;
};

const Movie: React.FC<Props> = props => {
  const [creditView, setCreditView] = React.useState(<LoaderCreditItem />);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const setCredits = async (credits: any) => {
    await AsyncStorage.setItem(
      `@credits_${movie.id}:key`,
      JSON.stringify(credits),
    );
  };

  const getCredits = async () => {
    return await AsyncStorage.getItem(`@credits_${movie.id}:key`);
  };

  let movie = props.route.params.movie;
  let genres = props.route.params.genres;
  let rating = movie.vote_average
    ? movie.vote_average * 10 + '%'
    : 'Not Rated Yet';

  const getCastImage = (imageUri: any) => {
    if (imageUri == null) {
      return require('../../assets/images/user.png');
    }
    return {uri: imageUri};
  };

  const buildCreditView = async cast => {
    let perCredit: any[] = [];
    cast.forEach((cast: any) => {
      let imageUri =
        cast.profile_path != null
          ? TheMovieAPI.getImageUri(cast.profile_path)
          : null;
      perCredit.push(
        <CreditItem cast={cast} castImage={getCastImage(imageUri)} />,
      );
    });
    setCreditView(perCredit);
    setIsLoaded(true);
  };

  const initCredits = async () => {
    let credits = await getCredits();
    if (credits == null && !isLoading) {
      setIsLoading(true);
      const response = await TheMovieAPI.getMovieCredits(movie.id);
      await setCredits(response.data.cast);
      setIsLoading(false);
    } else if (credits != null && !isLoaded) {
      await buildCreditView(JSON.parse(credits));
    }
  };

  React.useEffect(() => {
    initCredits();
  });

  return (
    <ScrollView>
      <View style={[styles.container]}>
        <View style={styles.row}>
          <View style={[styles.col, {flex: 1}]}>
            <Image
              source={{uri: TheMovieAPI.getImageUriHigh(movie.poster_path)}}
              style={styles.movieImage}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.col, {flex: 1}]}>
            <Text style={styles.movieTitle}>{movie.title}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.col, {flex: 1}]}>
            <View style={styles.wrapper}>
              <Text style={styles.ratingPill}>{rating}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.row, styles.pushBottom]}>
          <View style={[styles.col, {flex: 1}]}>
            <View style={styles.defaultMargin}>
              <Text style={styles.textLrg}>{'Overview'}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.row, styles.pushBottom, styles.defaultMargin]}>
          <View style={[styles.col, {flex: 1}]}>
            <View>
              <Text style={styles.textSub}>{movie.overview}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.row, styles.pushBottom, styles.defaultMargin]}>
          <View style={[styles.col, {flex: 1}]}>
            <View>
              <Text style={styles.textLrg}>{'Genres'}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.row, styles.pushBottom, styles.defaultMargin]}>
          {genres}
        </View>
        <View style={[styles.row, styles.pushBottom, styles.defaultMargin]}>
          <View style={[styles.col, {flex: 1}]}>
            <View>
              <Text style={styles.textLrg}>{'Credits'}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.row, styles.pushBottom, styles.defaultPadding]}>
          <ScrollView horizontal={true} style={{flexWrap: 'nowrap'}}>
            {creditView}
          </ScrollView>
        </View>
        <View style={{marginTop: 10}} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  col: {
    flexDirection: 'column',
  },
  movieTitle: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  movieImage: {
    width: 200,
    height: 300,
    borderRadius: 8,
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
    alignSelf: 'center',
  },
  ratingPill: {
    color: 'white',
    backgroundColor: '#579041',
    padding: 8,
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 10,
    marginBottom: 10,
  },
  wrapper: {
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  defaultMargin: {
    marginLeft: 20,
    marginRight: 20,
  },
  defaultPadding: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  textLrg: {
    fontSize: 22,
    color: 'black',
  },
  textSub: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pushBottom: {
    marginBottom: 10,
  },
  pill: {
    padding: 5,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: 'rgba(164,164,164,0.4)',
    borderRadius: 20,
  },
  subMd: {
    fontSize: 12,
    color: 'black',
    fontWeight: '600',
  },
  elevation: {
    elevation: 10,
    shadowColor: 'rgb(38,37,37)',
  },
});

export default Movie;
