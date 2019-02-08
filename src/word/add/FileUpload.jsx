import React from 'react';
import readXlsxFile from 'read-excel-file';

const schema = {
  word: {
    prop: 'word',
    type: String,
    required: true
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
  }
};

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  componentDidMount() {
    console.log('input', this.input.current);
    const input = this.input.current;

    input.addEventListener('change', () => {
      readXlsxFile(input.files[0], { schema }).then(({ rows, errors }) => {
        console.log('row', rows[1]);
        // `rows` is an array of rows
        // each row being an array of cells.
      });
    });
  }

  render() {
    return (
      <input ref={this.input} type="file" id="input" />
    );
  }
}

export default FileUpload;
