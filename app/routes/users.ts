import app from '~/app';
import { getUser } from '~/db/users';

app.get('/db', async (req, res) => {
  console.log('Accessing /db');
  try {
    res.send(await getUser());
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
});
