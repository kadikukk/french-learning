export const initialState = {
  stepIndex: 0,
  finished: false,
  selectedInput: 'oneByOne',
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
    verbGroup: '',
    additionalInfo: ''
  },
  isWordEdit: false,
  id: -1
};
