Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})


new Vue({
  el: "#password-validator",
  data: {
    passwordText: '',
    hasNumber: false,
    is8Chars: false,
    hasLowercase: false,
    hasUppercase: false,
    hasSpecial: false,
    isOK: false
  },
  created: function() {
    this.debouncedCheckPassword = _.debounce(this.checkPassword, 500)
  },
  watch: {
    passwordText: function (oldPassword, newPassword) {
      this.debouncedCheckPassword();
    }
  },
  methods: {
    checkPassword: function () {
      //check 8 characers
      if (this.passwordText.length >= 8) {
        this.is8Chars = true;
      } else {
        this.is8Chars = false;
      }

      //check number
      if ([...this.passwordText].some(n => !isNaN(n) === true)) {
        this.hasNumber = true;
      } else {
        this.hasNumber = false;
      }

      
      //check special
      let checkSpecial = e => {
        if (e.match(/^[^a-zA-Z0-9]+$/) !=null) {
          return true;
        }
        return false;
      }
      if ([...this.passwordText].some(checkSpecial)) {
        this.hasSpecial = true;
      } else {
        this.hasSpecial = false;
      }
    

      //check lowercase
      let checkLowercase = c => {
        if (isNaN(c) && !checkSpecial(c)) {
          if (c === c.toLowerCase()) {
            return true;
          }
          return false;
        }
      }
      if ([...this.passwordText].some(checkLowercase)) {
        this.hasLowercase = true;
      } else {
        this.hasLowercase = false;
      }

      //check uppercase
      let checkUppercase = c => {
        if (isNaN(c) && !checkSpecial(c)) {
          if (c === c.toUpperCase()) {
            return true;
          }
          return false;
        }
      }
      if ([...this.passwordText].some(checkUppercase)) {
        this.hasUppercase = true;
      } else {
        this.hasUppercase = false;
      }

      if (this.is8Chars && this.hasNumber && this.hasLowercase && this.hasUppercase && this.hasSpecial) {
        this.isOK = true;
      } else {
        this.isOK = false;
      }

      console.log('8 check '+this.is8Chars);
      console.log('num check ' + this.hasNumber);
      console.log('low check '+this.hasLowercase);
      console.log('up check '+this.hasUppercase);
      console.log('spec check '+this.hasSpecial);

    }
  }
})


