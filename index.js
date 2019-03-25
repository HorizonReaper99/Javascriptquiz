var allQuestions = [{
  question: "Who is the stongest character?",
  choices: ["Superman", "Hulk", "Dr Manhattan", "Doomsday"],
  correctAnswer: 2
}, 
{
  question: "What makes the above character so powerful?",
  choices: ["Heat vision", "Time Manipulation","Cosmic Power","Willpower"],
  correctAnswer: 1
}, 
{
  question: "Which year was DC Comics born?",
  choices: ["1939","1949","1959","2009"],
  correctAnswer: 0
},
{
  question: "What universe is Skywalker from?" ,
  choices: ["Star Wars", "Marvel", "DC", "Star Trek"],
  correctAnswer: 0
}, 
{
  question: "Spiderman is from which universe?",
  choices: ["DC","Disney","Marvel", "Halo"],
  correctAnswer: 2
}, 
{
  question: "What famous person died that impacted Marvel?",
  choices: ["Stan Lee", "Carrie Fisher", "Celeste Yarnell", "Miguel Ferrer"],
  correctAnswer: 0
}, 
{
  question: "Is loki alive?",
  choices: ["YES","NO","MAYBE","NEVER"],
  correctAnswer: 1
}, 
{
  question: "Who is Star lord's father?" ,
  choices: ['Ego', 'Yondu','Ronan','Drax'],
  correctAnswer: 0
},
 {
  question: "What makes Batman so Special?" ,
  choices: ['Wealth','Knows everyones weakness','Has no powers','Inlove with Wonder Womean'],
  correctAnswer: 1
},
 {
  question: "Who is richer?" ,
  choices: ['Bruce Wayne','Tony Stark','King Tchalla', 'Lex Luther'],
  correctAnswer: 1
}, 
{
  question: "Who is the Funniest character?" ,
  choices: ['Deadpool','Spiderman','Flash', 'Captain Kirk'],
  correctAnswer: 0
}, {
  question: "Ant-Man has had a number of incarnations. Which of these was his first?" ,
  choices: ['Scott Lang', 'Hank Pym','Mick Taylor','Vemon'],
  correctAnswer: 1
}, {
  question: "Which emotion is embodied by the entity of the Green Lantern corps?" ,
  choices: ['Hope','Death','Fear','Willpower'],
  correctAnswer: 3
}, {
  question: "What type of kryptonite makes Superman gay?" ,
  choices: ['Red','Blue','Pink','Anti'],
  correctAnswer: 2
}, {
  question: "Lando lost the Millenium Falcon to Han during a:" ,
  choices: ['Raid','Bet','Battle','Wormhole travel'],
  correctAnswer: 1
}, {
  question: "Yoda claims that Lukes training will not be complete until he:" ,
  choices: ['Discovers the truth about leia','Builds a lightsaber','Faces Darth Vader','Kills himself'],
  correctAnswer: 2
}, {
  question: "This Side of Paradise:" ,
  choices: ['Exo II','Omicron Ceti III','Sarpeidon','Terra'],
  correctAnswer: 1
}, {
  question: "Our first officer is Lieutenant JG Joe Tormolen. At the end of his life, he became convinced that man was not meant to be in space. How did this depressed young man die?" ,
  choices: ['He succumbed to an infection due to touching diseased liquid','He drank poisoned milk','He shot himself with a phaser'],
  correctAnswer: 0
}, {
  question: "Who plays the role of Spock?" ,
  choices: ['Leanard Minoy','Leannard Nimmoy', 'Leonard Nimoy'],
  correctAnswer: 2
}, {
  question: "Why did it not work?",
  choices: ["It was a clone of Batman","Batman had too much willpower","He took it off","He was still alive"],
  correctAnswer: 3
}, {
  question: "What continent is Kuwait located in??",
  choices: ["Africa", "Europe", "North America", "Asia"],
  correctAnswer: 3
}];

function Quiz(options) {
  var elem = options.elem;
  var allQuestions = options.questions;
  var q_number = allQuestions.length;

  var answers = [];
  var questions = [];

  var correct_answers = 0;
  var current_number;

  generateQuestions(allQuestions);
  
  initQuiz();

  function generateQuestions(q) {
    for (var i = 0; i < q_number; i++) {
      var question = document.createElement('div');
      question.classList.add('question');
      question.id = 'question';

      var title = document.createElement('h1');
      title.textContent = q[i].question;

      question.appendChild(title);

      var list = document.createElement('ul');

      for (var j = 0, len = q[i].choices.length; j < len; j++) {
        var choice = document.createElement('li');

        var check = document.createElement('input');
        check.setAttribute('type', 'radio');
        check.setAttribute('name', 'question');

        var choice_text = document.createElement('label');
        choice_text.setAttribute('for', check.name);
        choice_text.textContent = q[i].choices[j];

        choice.appendChild(check);
        choice.appendChild(choice_text);

        list.appendChild(choice);
      }

      var prev_button = document.createElement('button');
      prev_button.textContent = 'Previous Question';
      prev_button.addEventListener('click', prevQuestion);

      var next_button = document.createElement('button');

      if (i === q_number - 1) {
        next_button.textContent = 'Finish Him';
        next_button.addEventListener('click', finishQuiz);
      } else {
        next_button.textContent = 'Next Question';
        next_button.addEventListener('click', nextQuestion);
      }

      question.appendChild(list);

      if (i > 0) question.appendChild(prev_button);
      question.appendChild(next_button);

      questions.push(question);
    }
  }

  function render_question(number) {
    var warning = elem.getElementsByClassName('warning')[0];
    if (warning) {
      elem.removeChild(warning);
    }
    elem.appendChild(questions[number]);
    $('#question').hide().fadeIn(500);
  }

  function initQuiz() {
    current_number = 0;
    render_question(current_number);
  }

  function checkAnswers() {
    for (var i = 0; i < q_number; i++) {
      if (answers[i] === allQuestions[i].correctAnswer) {
        correct_answers++;
      }
    }
  }

  function validateAnswer() {
    var list_items = elem.getElementsByTagName('input');
    var answered = false;
    for (var i = 0, len = list_items.length; i < len; i++) {
      if (list_items[i].checked) {
        answers.push(i);
        answered = true;
        break;
      }
    }
    if (!answered && !elem.getElementsByClassName('warning')[0]) {
      var warning = document.createElement('span');
      warning.textContent = "Answer the question before you proceed, please.";
      warning.classList.add('warning');

      elem.appendChild(warning);
    }
    return answered;
  }

  function nextQuestion() {
    if (validateAnswer()) {
      elem.removeChild(questions[current_number]);
      current_number++;
      render_question(current_number);
    }
  }

  function prevQuestion() {
    elem.removeChild(questions[current_number]);
    answers.pop();
    current_number--;
    render_question(current_number);
  }

  function finishQuiz() {
    if (validateAnswer()) {
      checkAnswers();
      elem.removeChild(questions[current_number]);
      var result = document.createElement('p');
      if (correct_answers === 0) {
        result.textContent = "Thank you for taking this quiz! Sorry, but none of your answers were right :( Try again if you want to improve your score.";
      } else {
        result.textContent = "Thank you for taking this quiz! Your final score is: " + correct_answers + " correct answers!";
      }
      elem.appendChild(result);
    }
  }
}

var quiz = new Quiz({
  elem: document.getElementById('quiz'),
  questions: allQuestions
});