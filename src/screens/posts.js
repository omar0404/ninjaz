import {View, Text, FlatList, Alert} from 'react-native';
import Post from '../components/post';
import {useEffect, useState} from 'react';
import {getPosts} from '../api/posts';

const Posts = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts()
      .then(res => {
        setPosts(res.data.data);
      })
      .catch(err => {
        alert(err);
      });
  }, []);
  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({item}) => <Post post={item} />}
        keyExtractor={item => item.id}
        //   onEndReached={() => {

        //   }}
      />
    </View>
  );
};
export default Posts;
