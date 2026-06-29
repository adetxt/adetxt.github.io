export type MusicItem = {
  title: string
  artist: string
  coverGradient: string
}

export const currentlyListening: MusicItem = {
  title: 'Currents',
  artist: 'Tame Impala',
  coverGradient: 'from-orange-400 via-pink-500 to-purple-500',
}

export const currentlyReading: MusicItem = {
  title: 'The Pragmatic Programmer',
  artist: 'David Thomas & Andrew Hunt',
  coverGradient: 'from-emerald-400 via-teal-500 to-cyan-500',
}
