const app = Vue.createApp({
  data() {
    return {
      visible: false,
      charName: 'Clark Melton',
      money: 0,
      location: 'Grove Street',
      onlinePlayers: [{ loggedIn: true, name: 'Clark Melton', id: 0, ping: 0 }],
      serverSlots: 128,
    };
  },
  mounted() {
    if (!('alt' in window)) return;

    alt.on('setVisible', (value) => {
      this.visible = value;
    });

    alt.on('updateDatas', (players, maxPlayers) => {
      this.onlinePlayers = players;
      this.serverSlots = maxPlayers;
    });

    alt.on('updateLocalDatas', (charName, money, location) => {
      this.charName = charName;
      this.money = money;
      this.location = location;
    });

    alt.on('updateImage', (image) => {
      this.image = 'data:image/png;base64,' + image;
    });
  },
}).mount('#app');
