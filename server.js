import * as alt from 'alt-server';
import { getTimestamp } from './shared';

alt.on('playerConnect', (player) => {
  player.setSyncedMeta('joinTime', getTimestamp());
});
