export interface StoryI {
  id: number;
  url: string;
  type: string;
  duration: number;
  isSeen: boolean;
  readMoreUrl: string;
  isPaused: boolean;
}

export interface UserI {
  id?: string | number;
  username: string;
  title: string;
  profile: string;
  stories: Array<StoryI>;
}
