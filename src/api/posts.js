import api from './api';

export const getPosts = params => {
  return api.get('post', {params: Object.assign({limit: 10, page: 1}, params)});
};
