import { resolve } from 'path';
import express from 'express';
import compression from 'compression';
import * as nba from './nba';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
} else {
  app.use(compression());
}

app.use('/', express.static(resolve(__dirname, '../public')));

app.get('/teams', (req, res) => {
  nba.getTeams((err, teams) => {
    if (err) {
      return res.status(err.code || 500).send(err.message);
    }

    res.json({ teams });
  });
});

app.get('/teams/:teamId/games', (req, res) => {
  const { teamId } = req.params;

  nba.getGamesForTeam(teamId, (err, games) => {
    if (err) {
      return res.status(err.code).send(err.message);
    }

    res.json({ games });
  });
});

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, '../public/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Listening on port %d', port));
