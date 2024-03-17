import 'react-native';
import React from 'react';

import {it, jest, expect} from '@jest/globals';

import renderer, {act} from 'react-test-renderer';
import * as postsApi from '../src/api/posts';
import Posts from '../src/screens/posts';
import {Owner, Post as PostModel} from '../src/models';
import {RealmProvider} from '@realm/react';
import Post from '../src/components/post';
jest.useFakeTimers();

it('should render post component if get posts returned data', async () => {
  jest.spyOn(postsApi, 'getPosts').mockResolvedValueOnce({
    data: {data: [{id: 1, owner: {firstName: 'omar'}}]},
  });
  let component;
  await act(async () => {
    component = renderer.create(
      <RealmProvider schemaVersion={5} schema={[PostModel, Owner]}>
        <Posts />
      </RealmProvider>,
    );
  });

  expect(component.root.findByType(Post)).toBeDefined();
});
it('should render no data test when there are no posts', async () => {
  jest.spyOn(postsApi, 'getPosts').mockResolvedValueOnce({
    data: {data: []},
  });
  let component;
  await act(async () => {
    component = renderer.create(
      <RealmProvider schemaVersion={5} schema={[PostModel, Owner]}>
        <Posts />
      </RealmProvider>,
    );
  });

  expect(component.root.findByProps({testID: 'no-data'})).toBeDefined();
});
