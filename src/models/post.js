import Realm from 'realm';

export class Post extends Realm.Object {
  static schema = {
    name: 'Post',
    properties: {
      _id: 'objectId',
      id: 'string',
      owner: 'Owner',
      publishDate: 'string',
      image: 'string',
      text: 'string',
      tags: 'string[]',
      likes: 'int',
    },
    primaryKey: '_id',
  };
}
