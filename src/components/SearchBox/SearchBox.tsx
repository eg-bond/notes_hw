import { useNotesContext } from '@/context/NotesContext';
import { AppRoutes, Styles } from '@/types/generalTypes';
import { Button, rem } from '@mantine/core';
import { Spotlight, spotlight } from '@mantine/spotlight';
import { IconFileText, IconSearch } from '@tabler/icons-react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchBox = () => {
  const { notesList } = useNotesContext();
  const navigate = useNavigate();
  const actions = useMemo(() => {
    return notesList.map(note => ({
      id: String(note.id),
      label: note.title,
      onClick: () => navigate(`/${AppRoutes.Notes}/${note.id}`),
      leftSection: (
        <IconFileText
          style={{ width: rem(24), height: rem(24) }}
          stroke={1.5}
        />
      ),
    }));
  }, [notesList]);

  return (
    <>
      <Button
        onClick={spotlight.open}
        variant='default'
        h={Styles.HeaderHeight}
        radius={Styles.BtnRadius}
        leftSection={<IconSearch size={14} />}>
        Поиск
      </Button>
      <Spotlight
        actions={actions}
        nothingFound='Ничего не найдено...'
        highlightQuery
        limit={7}
        searchProps={{
          leftSection: (
            <IconSearch
              style={{ width: rem(20), height: rem(20) }}
              stroke={1.5}
            />
          ),
          placeholder: 'Поиск...',
        }}
      />
    </>
  );
};
