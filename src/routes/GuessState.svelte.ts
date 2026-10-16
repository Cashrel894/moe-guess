import type { Post } from "#lib/types.ts";

export class GuessState {
  private post: Post | null;

  current = $state('');
  correct = $state(false);
  success: string[] = $state([]);
  failure: string[] = $state([]);

  constructor(post: Post | null) {
    this.post = post;
  }

  update(guess: string) {
    if (this.post === null)
      return;

    this.current = guess;
    this.correct = this.post.tags.includes(guess);

    const arrayToPush = this.correct ? this.success : this.failure;
    arrayToPush.push(guess);
  };

  get valid() {
    return this.post !== null;
  }
}
