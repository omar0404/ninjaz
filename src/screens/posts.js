import {
  View,
  Text,
  FlatList,
  Alert,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Post from '../components/post';
import {useEffect, useState} from 'react';
import {getPosts} from '../api/posts';

const Posts = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setLoading(true);
    getPosts()
      .then(res => {
        setLoading(false);
        setPosts(res.data.data);
      })
      .catch(err => {
        setLoading(false);
        alert(err);
      });
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    getPosts()
      .then(res => {
        setPosts(res.data.data);
        setRefreshing(false);
      })
      .catch(err => {
        setRefreshing(false);
      });
  };
  const onEndReached = () => {
    if (loading) {
      return;
    }
    setFetchingMore(true);
    getPosts({page: page + 1})
      .then(res => {
        setFetchingMore(false);
        setPosts([...posts, ...res.data.data]);
        setPage(page + 1);
      })
      .catch(err => {
        setFetchingMore(false);
      });
  };
  return (
    <View>
      <FlatList
        contentContainerStyle={{paddingBottom: 100}}
        data={posts}
        renderItem={({item}) => <Post post={item} />}
        keyExtractor={item => item.id}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReached={onEndReached}
        ListEmptyComponent={
          loading ? (
            <View style={style.loading}>
              <ActivityIndicator />
            </View>
          ) : (
            <Text style={style.noData}>no data</Text>
          )
        }
        ListFooterComponent={
          fetchingMore && (
            <ActivityIndicator style={style.fetchingMoreIndicator} />
          )
        }
      />
    </View>
  );
};
const style = StyleSheet.create({
  noData: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fetchingMoreIndicator: {
    padding: 10,
  },
  loading: {
    height: 300,
    justifyContent: 'center',
  },
});
export default Posts;
