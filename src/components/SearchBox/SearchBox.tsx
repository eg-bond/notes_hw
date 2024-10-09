import { NotesListItemT, useNotesContext } from '@/context/NotesContext';
import { AppRoutes } from '@/types/generalTypes';
import { Button, rem } from '@mantine/core';
import { Spotlight, spotlight } from '@mantine/spotlight';
import { IconFileText, IconSearch } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const makeSpotliteAction = (
  id: NotesListItemT['id'],
  label: NotesListItemT['title'],
  onClick: () => unknown
) => ({
  id,
  label,
  onClick,
  leftSection: (
    <IconFileText style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
  ),
});

export const SearchBox = () => {
  const { notesList } = useNotesContext();
  const navigate = useNavigate();
  const actions = notesList.map(note =>
    makeSpotliteAction(note.id, note.title, () =>
      navigate(`/${AppRoutes.Notes}/${note.id}`)
    )
  );

  return (
    <>
      <Button
        onClick={spotlight.open}
        variant='default'
        leftSection={<IconSearch size={14} />}>
        Search
      </Button>
      <Spotlight
        actions={actions}
        nothingFound='Nothing found...'
        highlightQuery
        limit={7}
        searchProps={{
          leftSection: (
            <IconSearch
              style={{ width: rem(20), height: rem(20) }}
              stroke={1.5}
            />
          ),
          placeholder: 'Search...',
        }}
      />
    </>
  );
};
