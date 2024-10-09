import { useState } from 'react';
import { db } from './db';

export function AddUser() {
  const [nickname, setNickName] = useState('');
  const [pass, setPass] = useState('');
  const [status, setStatus] = useState('');

  async function addFriend() {
    try {
      // Add the new friend!
      const userId = await db.users.add({
        nickname,
        pass,
      });
      const notesId = await db.userNotes.add({
        notes: [],
      });

      setStatus(
        `User ${nickname} successfully added. Got id ${userId} and notesId ${notesId}`
      );
      setNickName('');
      setPass('');
    } catch (error) {
      setStatus(`Failed to add ${nickname}: ${error}`);
    }
  }

  return (
    <>
      <p>{status}</p>
      Nickname:
      <input
        type='text'
        value={nickname}
        onChange={ev => setNickName(ev.target.value)}
      />
      <input
        type='text'
        value={pass}
        onChange={ev => setPass(ev.target.value)}
      />
      <button onClick={addFriend}>Add</button>
    </>
  );
}
