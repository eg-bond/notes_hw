import SimpleMDE from 'easymde';

export const editorOptions = {
  spellChecker: false,
  toolbar: [
    'bold',
    'italic',
    'heading',
    '|',
    'quote',
    'unordered-list',
    'ordered-list',
    '|',
    'link',
    'image',
    '|',
    'preview',
    '|',
    'guide',
    '|',
  ],
} as SimpleMDE.Options;
