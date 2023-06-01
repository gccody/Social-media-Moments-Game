enum languages {
  english = 'en',
  spanish = 'es',
  french = 'fr',
}

export type FUser = {
  bio: string;
  cards: string[],
  packs: string[],
  coins: number,
  xp: number,
  achievements: string[],
  settings: {
    darkMode: boolean,
    notifications: boolean,
    sound: boolean,
    music: boolean,
    hapticFeedback: boolean,
    language: languages,
  },
  friends: string[],
  friendRequestsSent: string[],
  friendRequestsReceived: string[],
  [key: string]: any;
}

export const DefaultFUser: FUser =  {
  bio: '',
  cards: [],
  packs: [],
  coins: 0,
  xp: 0,
  achievements: [],
  settings: {
    darkMode: true,
    notifications: true,
    sound: true,
    music: true,
    hapticFeedback: true,
    language: languages.english,
  },
  friends: [],
  friendRequestsSent: [],
  friendRequestsReceived: []
};