import { Button, Input } from '@mantine/core';

interface AddNoteFormProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  resetForm: () => void;
}

export const AddNoteForm: React.FC<AddNoteFormProps> = ({
  inputValue,
  setInputValue,
  handleSubmit,
  resetForm,
}) => (
  <form onSubmit={handleSubmit} onReset={resetForm}>
    <Input
      value={inputValue}
      onChange={e => setInputValue(e.target.value)}
      autoFocus
    />
    <Button type='submit' variant='filled' color='green'>
      Create Note
    </Button>
    <Button type='reset' variant='filled' color='red'>
      Cancel
    </Button>
  </form>
);
