import * as alt from 'alt-client';
import * as native from 'natives';

import { getTimestamp } from './shared';

const KEY = 20; //Caps-Lock
let visible = false;
let updateTimer = null;

const UI = new alt.WebView('http://resource/ui/index.html', false);
UI.on('load', () => UI.focus());

async function setVisible(value) {
  UI.emit('setVisible', value);
  visible = value;

  if (updateTimer) {
    alt.clearInterval(updateTimer);
    updateTimer = null;
  }

  if (!visible) return;

  update();
  updateTimer = alt.setInterval(update, 1000);

  const localPlayer = alt.Player.local;
  const pos = localPlayer.pos;

  const [, streetHash] = native.getStreetNameAtCoord(pos.x, pos.y, pos.z);
  const money = localPlayer.getSyncedMeta('money') ?? 0;

  const mug = native.registerPedheadshotTransparent(localPlayer);
  await alt.Utils.waitFor(() => native.isPedheadshotReady(mug));
  const base64Mug = alt.getHeadshotBase64(mug);
  native.unregisterPedheadshot(mug);

  UI.emit('updateLocalPlayer', localPlayer.name, money, native.getStreetNameFromHashKey(streetHash), base64Mug);
}

function update() {
  const currentTime = getTimestamp();

  UI.emit(
    'updatePlayers',
    alt.Player.all.map((player) => {
      const joinTime = player.getSyncedMeta('joinTime') || 0;
      const onlineTime = new Date(currentTime - joinTime);

      return {
        id: player.id,
        name: player.name,
        onlineTime: onlineTime.toLocaleString('default', { minute: '2-digit', second: '2-digit' }),
      };
    })
  );
}

function keyHandle(key, state) {
  if (key === KEY) {
    setVisible(state);
  }
}

alt.on('keydown', (key) => keyHandle(key, true));
alt.on('keyup', (key) => keyHandle(key, false));
