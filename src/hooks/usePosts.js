import {useQuery, useRealm} from '@realm/react';
import {useCallback, useEffect, useState} from 'react';
import {getPosts} from '../api/posts';
import {BSON} from 'realm';
import {useNetInfo} from '@react-native-community/netinfo';
const usePosts = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const realm = useRealm();
  const netinfo = useNetInfo();
  const savedPosts = useQuery('Post');
  const savedOwners = useQuery('Owner');
  const savePosts = useCallback(
    posts => {
      realm.write(() => {
        posts.forEach(post => {
          const {owner, ...rest} = post;
          realm.create('Post', {
            _id: new BSON.ObjectId(),
            owner: realm.create('Owner', {
              _id: new BSON.ObjectId(),
              ...post.owner,
            }),
            ...rest,
          });
        });
      });
    },
    [realm],
  );
  const deletePosts = useCallback(() => {
    realm.write(() => {
      realm.delete(savedPosts);
      realm.delete(savedOwners);
    });
  }, [realm, savedPosts, savedOwners]);
  const onRefresh = () => {
    setRefreshing(true);
    getPosts()
      .then(res => {
        setPosts(res.data.data);
        deletePosts();
        savePosts(res.data.data);
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
        savePosts(res.data.data);
        setPage(page + 1);
      })
      .catch(err => {
        setFetchingMore(false);
      });
  };

  useEffect(() => {
    if (netinfo.isConnected) {
      getPosts()
        .then(res => {
          setLoading(false);
          setPosts(res.data.data);
          deletePosts();
          savePosts(res.data.data);
        })
        .catch(err => {
          setLoading(false);
        });
    } else {
      setPosts(realm.objects('Post'));
    }
  }, [netinfo.isConnected]);

  return {posts, loading, onEndReached, onRefresh, refreshing, fetchingMore};
};

export default usePosts;
