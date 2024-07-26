import { useParams } from 'react-router-dom';

export function SelectedNote() {
  const { id } = useParams<{ id: string }>();

  return <div>{id}</div>;
}
