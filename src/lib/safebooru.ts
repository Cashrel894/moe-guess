import type { Post } from './types.ts'

const RANDOM_POST_URL = 'https://safebooru.donmai.us/posts.json?limit=1&random=true&tags=score:>=100';

export const getRandomPost = async (): Promise<Post> => {
  const response = await fetch(RANDOM_POST_URL);

  if (!response.ok) {
    throw new Error('Failed to get random post :(');
  }

  const [post] = await response.json();
  console.log(post);

  const { file_url, tag_string_general } = post;

  return {
    url: file_url,
    tags: tag_string_general.split(' ')
  };
}
