import { Button, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { addNoteInputName } from './NotesPanel';
import { Colors, Styles } from '@/types/generalTypes';

interface AddNoteFormProps {
  handleSubmit: (values: { add_note: string }) => Promise<void>;
  onReset: () => void;
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
  onReset,
  form,
}) => {
  return (
    <form onSubmit={form.onSubmit(handleSubmit)} onReset={onReset}>
      <TextInput
        {...form.getInputProps(addNoteInputName)}
        key={form.key(addNoteInputName)}
        placeholder='Введите название заметки'
        onFocus={e => e.currentTarget.select()}
        data-autofocus
        mb={'md'}
      />
      <Button
        mr={'sm'}
        type='submit'
        variant='filled'
        color={Colors.Green}
        radius={Styles.BtnRadius}>
        Подтвердить
      </Button>
      <Button
        type='reset'
        variant='filled'
        color={Colors.Red}
        radius={Styles.BtnRadius}>
        Отмена
      </Button>
    </form>
  );
};
