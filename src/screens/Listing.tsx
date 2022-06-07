import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {MovieListItem} from '../components/MovieListItem';
import {LoaderListItem} from '../components/LoaderListItem';
import {Categories} from '../components/Categories';
import {Header} from '../components/Header';
import {useNavigation} from '@react-navigation/native';
import {TheMovieAPI} from '../api/TheMovieAPI';

export type Props = {
  navigation?: any;
};

const Listing: React.FC<Props> = ({}) => {
  const [movies, setMovies] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [movieDetails, setMovieDetails] = React.useState({});
  const [selection, setSelection] = React.useState('upcoming');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const navigation = useNavigation();

  const getPromise: Promise<any> = () => {
    if (isLoading) {
      return;
    }
    switch (selection) {
      case 'upcoming':
        return TheMovieAPI.getUpcomingMovies(page);
      case 'popular':
        return TheMovieAPI.getPopularMovies(page);
      case 'topRated':
        return TheMovieAPI.getTopRatedMovies(page);
    }
  };

  React.useEffect(() => {
    initMovies();
  });

  const resetSelection = (selection: string) => {
    setSelection(selection);
    setPage(1);
    setMovies([]);
    setMovieDetails([]);
  };

  const initMovies = () => {
    if (movies.length == 0) {
      fetchMovies();
    }
  };

  const setDetails = (response: any) => {
    if (
      typeof response.data !== 'undefined' &&
      typeof response.data.id !== 'undefined'
    ) {
      var details = movieDetails;
      if (details.hasOwnProperty(response.data.id)) {
        return;
      }
      details[response.data.id] = response.data;
      setMovieDetails(details);
    }
  };

  const fetchMovies = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    const response = await getPromise(page);
    let retrievedIds = response.data.results.map((movie: any) => movie.id);
    let newMovies = [];

    for (let i = 0; i < retrievedIds.length; i++) {
      if (retrievedIds[i] in movies) {
        continue;
      }
      newMovies.push(response.data.results[i]);
    }

    setMovies([...movies, ...newMovies]);

    const movieDetails = await TheMovieAPI.getMovieDetailsByMovies(newMovies);

    movieDetails.forEach((detail: any) => {
      setDetails(detail);
    });

    let newPage = page + 1;
    setPage(newPage);

    setIsLoading(false);
  };

  const renderItem = ({item}) => (
    <MovieListItem
      movie={item}
      navigation={navigation}
      details={movieDetails[item.id]}
    />
  );

  return (
    <View style={styles.container}>
      <Header title={'Movies'} />
      <Categories control={resetSelection} selected={selection} />
      <FlatList
        ListFooterComponentStyle={{flexGrow: 1, justifyContent: 'flex-end'}}
        contentContainerStyle={{flexGrow: 1}}
        style={styles.margined}
        data={movies}
        refreshing={isRefreshing}
        onRefresh={async () => {
          setIsRefreshing(true);
          resetSelection(selection);
          await fetchMovies();
          setIsRefreshing(false);
        }}
        renderItem={renderItem}
        ListFooterComponent={<LoaderListItem />}
        scrollEventThrottle={250}
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        updateCellsBatchingPeriod={100}
        onEndReached={async () => {
          await fetchMovies();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
  },
  margined: {},
});

export default Listing;
