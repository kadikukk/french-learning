export const initialState = {
  stepIndex: 2,
  finished: false,
  selectedInput: 'fromFile',
  chapterId: '',
  subjectId: '',
  word: {
    type: 'noun',
    word: '',
    translation: '',
    plural: '',
    masculine: '',
    feminine: '',
    gender: '',
    preposition: '',
    postposition: '',
    verbGroup: '',
    additionalInfo: ''
  },
  isWordEdit: false,
  id: -1
};
