var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!',
    isYes: false,
    questions: [],
    checkedQuestions: []
  },
  watch: {
    // whenever question changes, this function will run
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  created: function () {
    // _.debounce is a function provided by lodash to limit how
    // often a particularly expensive operation can be run.
    // In this case, we want to limit how often we access
    // yesno.wtf/api, waiting until the user has completely
    // finished typing before making the ajax request. To learn
    // more about the _.debounce function (and its cousin
    // _.throttle), visit: https://lodash.com/docs#debounce
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  methods: {
    getAnswer: function () {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)'
        return
      }
      this.answer = 'Thinking...';
      axios.get('https://yesno.wtf/api')
        .then(response => {
          this.answer = _.capitalize(response.data.answer)
          if (this.answer == 'Yes') {
            this.isYes = true;
          } else{
            this.isYes = false;
          }
          this.questions.push({ askedQuestion: this.question, answered: this.answer });
        })
        .catch(error => this.answer = 'Error! Could not reach the API. ' + error)
    },
    removeAll: function (event) {
      this.questions.splice(0, this.questions.length);
      console.log(event.target.tagName);
    }
  }
})