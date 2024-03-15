import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Post from '../components/post';

import usePosts from '../hooks/usePosts';

const Posts = () => {
  const {posts, loading, onEndReached, onRefresh, refreshing, fetchingMore} =
    usePosts();

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
