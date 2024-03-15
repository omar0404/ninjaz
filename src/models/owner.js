import Realm from 'realm';

export class Owner extends Realm.Object {
  static schema = {
    name: 'Owner',
    properties: {
      _id: 'objectId',
      id: 'string',
      picture: 'string',
      firstName: 'string',
      lastName: 'string',
    },
    primaryKey: '_id',
  };
}
