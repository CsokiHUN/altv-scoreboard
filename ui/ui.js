const app = Vue.createApp({
  data() {
    return {
      visible: false,
      charName: '',
      money: 0,
      location: '',
      onlinePlayers: [],
    };
  },
  mounted() {
    if (!('alt' in window)) return;

    alt.on('setVisible', (value) => {
      this.visible = value;
    });

    alt.on('updatePlayers', (players) => {
      this.onlinePlayers = players;
    });

    alt.on('updateLocalPlayer', (charName, money, location, image) => {
      this.charName = charName;
      this.money = money;
      this.location = location;
      this.image = 'data:image/png;base64,' + image;
    });
  },
}).mount('#app');
