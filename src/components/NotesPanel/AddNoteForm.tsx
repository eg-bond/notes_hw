import { Button, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { addNoteInputName } from './NotesPanel';

interface AddNoteFormProps {
  handleSubmit: (values: { add_note: string }) => Promise<void>;
  form: UseFormReturnType<
    {
      add_note: string;
    },
    (values: { add_note: string }) => {
      add_note: string;
    }
  >;
}

export const AddNoteForm: React.FC<AddNoteFormProps> = ({
  handleSubmit,
  form,
}) => {
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        {...form.getInputProps(addNoteInputName)}
        key={form.key(addNoteInputName)}
        placeholder='Новая заметка'
        onFocus={e => e.currentTarget.select()}
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
};
