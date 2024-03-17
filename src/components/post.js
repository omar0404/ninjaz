import {Image, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
const Post = ({post}) => {
  return (
    <View style={style.card}>
      <View style={style.owner}>
        {post.owner?.picture ? (
          <FastImage style={style.avatar} source={{uri: post.owner.picture}} />
        ) : (
          <Text>
            {post.owner.firstName[0]} {post.owner.lastName?.[0]}
          </Text>
        )}
        <View style={style.ownerData}>
          <Text>{post.owner.firstName + ' ' + post.owner.lastName}</Text>
          <Text>{moment(post.publishDate).fromNow()}</Text>
        </View>
      </View>

      <View style={style.body}>
        <FastImage style={style.img} source={{uri: post.image}} />
        <View style={style.bodyRight}>
          <Text>{post.text}</Text>
          <View style={style.tags}>
            {(post?.tags ?? []).map(tag => (
              <View key={tag} style={style.tag}>
                <Text style={style.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          <View style={style.likes}>
            <Text>{post.likes} </Text>

            <Image
              style={style.likeIcon}
              source={require('../assets/like.png')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    marginTop: 20,
    padding: 15,
    marginHorizontal: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  body: {
    flexDirection: 'row',
  },
  owner: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  ownerData: {
    marginLeft: 10,
  },
  tag: {
    backgroundColor: '#DB2777',
    padding: 5,
    margin: 5,
    borderRadius: 3,
  },
  tagText: {
    color: 'white',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  img: {
    width: 100,
    height: 100,
  },
  bodyRight: {
    marginLeft: 10,
    flex: 1,
  },
  likeIcon: {
    width: 20,
    height: 20,
  },
  likes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
});
export default Post;
