module.exports = {
  data: () => {
    return {
      message: 'Добро пожаловать',
      video: './resources/video/welcome.mp4',
      description: 'в систему учета карточек участков',
      btn: {
        text: 'НАЧАТЬ'
      }
    };
  },
  methods: {
    hide: function () {
      // global.localStorage.setItem('showWelcomeScreen', false)
      // noinspection JSUnresolvedVariable
      this.$root.hideWelcomeScreen();
    }
  }
};
