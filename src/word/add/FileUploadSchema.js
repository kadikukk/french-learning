export const fileUploadSchema = {
  type: {
    prop: 'type',
    type: String
  },
  word: {
    prop: 'word',
    type: String
  },
  masculine: {
    prop: 'masculine',
    type: String
  },
  feminine: {
    prop: 'feminine',
    type: String
  },
  plural: {
    prop: 'plural',
    type: String
  },
  english: {
    prop: 'translation',
    type: String,
    required: true
  },
  gender: {
    prop: 'gender',
    type: String
  },
  preposition: {
    prop: 'preposition',
    type: String
  },
  postposition: {
    prop: 'postposition',
    type: String
  },
  group: {
    prop: 'verbGroup',
    type: Number
  },
  info: {
    prop: 'additionalInfo',
    type: String
  }
};
