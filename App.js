import React, {useState, useEffect} from "react";
import { SafeAreaView, FlatList, Image, Button, Text, View, StyleSheet, ActivityIndicator } from "react-native";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const requestMovies = async () => {
      setLoading(true);
      const res = await fetch("https://api.b7web.com.br/cinema/");
      const json = await res.json();

      if(json) {
        setMovies(json);
      }

      setLoading(false);
    }

    requestMovies();
  }, [])

  return(
    <SafeAreaView style={styles.container}>
      {loading &&
        <View style={styles.loadingArea}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      }
      {!loading &&
        <>
          <Text style={styles.totalMoviesText}>Total de Filmes: {movies.length}</Text>
            <FlatList style={styles.list}
              data={movies}
              renderItem={({item})=>(
                <View style={styles.movieItem}>
                  <Image 
                    source={{uri: item.avatar}} 
                    style={styles.movieImage} 
                    resizeMode="contain"
                  />
                  <Text style={styles.movieTitle}>{item.titulo}</Text>
                </View>
              )}
              keyExtractor={item => item.titulo}
            /> 
        </>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#333'
  },
  loadingArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFF',
  },
  totalMoviesText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  list: {
    flex: 1,
  },
  movieItem: {
    marginBottom: 30
  },
  movieImage: {
    height: 400
  },
  movieTitle: {
    color: '#FFF',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 5
  }
})

export default App;

