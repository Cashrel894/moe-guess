import type { Post } from "#lib/types.ts";

export class GuessState {
  private post: Post | null;

  current = $state('');
  correct = $state(false);
  success: string[] = $state([]);
  failure: string[] = $state([]);
  duplicated = $state(false);

  constructor(post: Post | null) {
    this.post = post;
  }

  private isDuplicated(guess: string) {
    return this.success.includes(guess) || this.failure.includes(guess);
  }

  update(guess: string) {
    if (this.post === null)
      return;

    if (this.isDuplicated(guess)) {
      this.duplicated = true;
      this.current = '';
      return;
    } else {
      this.duplicated = false;
    }

    this.current = guess;
    this.correct = this.post.tags.includes(guess);

    const arrayToPush = this.correct ? this.success : this.failure;
    arrayToPush.push(guess);
  };

  get valid() {
    return this.post !== null;
  }
}
