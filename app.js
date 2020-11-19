'use strict'
/**
 * Example store structure
 */

const store = {

  questions: [
    {
      question: "Who is the lead singer of the band Led Zeppelin?",
      answers: [
        "Jimmy Page",
        "Ozzy Osbourne",
        "Robert Plant",
        "Dave Grohl"
      ],
      correctAnswer: 2
    },
    {
      question: "Who wrote the song 'All Along the Watchtower'?",
      answers: [
        "Bob Dylan",
        "Jimi Hendrix",
        "Stevie Ray Vaughan",
        "The Hanson Brothers"
      ],
      correctAnswer: 0
    },
    {
      question: "Who is the lead guitarist for Metallica?",
      answers: [
        "James Hetfield",
        "Kirk Hammett",
        "Joe Perry",
        "Zakk Wylde"
      ],
      correctAnswer: 1
    },
    {
      question: "Which musician is a member of the band Pink Floyd?",
      answers: [
        "John Lennon",
        "Gene Simmons",
        "Jerry Garcia",
        "Dave Gilmour"
      ],
      correctAnswer: 3
    },
    {
      question: "Who is the guitarist for the band Queen?",
      answers: [
        "Brian May",
        "Pete Townshend",
        "Keith Richards",
        "The Edge"
      ],
      correctAnswer: 0
    },
    {
      question: "Who is the lead singer for the band Tool?",
      answers: [
        "Justin Bieber",
        "Roger Waters",
        "Maynard James Keenan",
        "Layne Staley"
      ],
      correctAnswer: 2
    },
    {
      question: "Who founded the band Nirvana?",
      answers: [
        "Miley Cyrus",
        "Kurt Cobain",
        "Alice Cooper",
        "Dr. Dre"
      ],
      correctAnswer: 1
    }
  ],
  questionNumber : 0,
  score : 0,
  quizStarted : false
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/
function generateMainPage() {
  return $('main').html(`<div class="mainPage">
  <h2>Let's test your head-banging knowledge</h2>
  <p>Enjoy</p>
  <button id="startQuiz">Start Quiz</button>
  </div>`)
}

function generateQuestion() {
  let question = store.questions[store.questionNumber];
  console.log(question);
  let answers = question.answers.map((answer, idx) => {
    console.log(answer, idx);
    return `<label for="answer${idx}">
    <input type="radio" id="answer${idx}" name="answer" required>
    ${answer}</label><br>`;
  });
  console.log(answers);
  return `<div class="mainPage">
  <div class="status"><span class="currentQuestion">Current Question: ${store.questionNumber + 1} out of 7</span>
  <span class="score">Current Score: ${store.score} out of 140</span>
  <form id="question">
    <h2>${question.question}</h2>
    ${answers.join("")} 
    <button type="submit">Submit Answer</button>
    </form>
    </div>
    `
}

function generateFinalPage() {
  return `
  <div class="finalPage">
  <h2>Congrats, you ARE worthy</h2>
  <p>Final Score: ${store.score} out of 140</p>
  <button id="startOver">Start Over</button>
  </div>
  `
}

function generateFeedback(answer, correct) {
  
}
// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/
function render() {
  let html = '';
  store.questionNumber === 7 ? html = generateFinalPage() :
  store.quizStarted === true ? html = generateQuestion() : html = generateMainPage();
  $('main').html(html);
}
// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/
function handleStartQuiz() {
  $('main').on('click', '#startQuiz', function (evt) {
    store.quizStarted = true;
    render();
  });
}

function handleAnswerSubmit() {
  $('main').on('submit', '#question', function (event) {
    event.preventDefault();
    let chosenAnswer = $("input[name='answer']:checked").val();
    console.log(chosenAnswer);
    if(chosenAnswer === "on") {
      store.score += 20
    }
    store.questionNumber++;
    render();

  })
}

function handleFinalAnswer() {
  $('main').on('click', '#startOver', function (event) {
    event.preventDefault();
    generateMainPage();
;
  })
}
// These functions handle events (submit, click, etc)



function main() {
  render(); 
  generateMainPage();
  generateQuestion(); 
  handleStartQuiz();
  handleAnswerSubmit();
  handleFinalAnswer();
}

$(main);
