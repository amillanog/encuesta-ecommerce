let elWelcomescreen = document.getElementById("welcomescreen");
let elQuestionScreen = document.getElementById("questionscreen");
let elScreenResult = document.getElementById("resultscreen");
let usuarios = [];
let ativeUser = {
  name: "",
  id: "",
};

function Usuarios(fname, id) {
  this.firstName = fname;
  this.id = id;
  this.addAnswer = [];
}

function Quiz() {
  this.questions = [];
  this.counter = 0;
  this.indexCurrentQuestion = 0;
  // console.log('this.indexCurrentQuestion :', this.indexCurrentQuestion )

  this.addWelcon = function (welcon) {
    welcon.getElement();
  };

  this.addQuestion = function (question) {
    this.questions.push(question);
  };

  this.showCurrentQuestion = function () {
    if (this.indexCurrentQuestion < this.questions.length) {
      this.questions[this.indexCurrentQuestion].getElement();
    } else {
      // console.log(usuarios);
      // elQuestionScreen.classList.add("hidden");
      elScreenResult.innerHTML = "";
      let elResultTitle = document.createElement("p");
      elResultTitle.textContent = "Resultados";
      elResultTitle.classList.add("title");
      elScreenResult.append(elResultTitle);
      let elResultDescription = document.createElement("p");
      elResultDescription.textContent = "Gracias por participar en la encuesta";
      elResultDescription.classList.add("description");
      elScreenResult.append(elResultDescription);
      let boxbutton = document.createElement("div");
      boxbutton.classList.add("box-button");
      elScreenResult.append(boxbutton);
      let elResultButton = document.createElement("button");
      elResultButton.textContent = "Ver resultados";
      let elResult = document.createElement("div");
      elResult.classList.add("result");
      elScreenResult.append(elResult);
      elResultButton.addEventListener("click", () => showResult(elResult));
      boxbutton.append(elResultButton);
      if (usuarios.length > 1) {
        let otherUsers = document.createElement("button");
        otherUsers.textContent = "Otras persona";
        otherUsers.setAttribute("id", "btOtherUsers");
        otherUsers.addEventListener("click", () => otherResult(elResult));
        boxbutton.append(otherUsers);
      }
      let btnFinish = document.createElement("button");
      btnFinish.textContent = "Finalizar";
      btnFinish.addEventListener("click", finishQuiz);
      boxbutton.append(btnFinish);
      elScreenResult.classList.remove("hidden");
    }
  };
}

function Welcome(title, description, buttonTile, buttonAction) {
  this.title = title;
  this.description = description;
  this.buttonTile = buttonTile;
  this.buttonAction = buttonAction;
  this.getElement = function () {
    elWelcomescreen.innerHTML = "";
    let elWelcomeTitle = document.createElement("p");
    elWelcomeTitle.classList.add("title");
    elWelcomeTitle.innerHTML = title;
    elWelcomescreen.append(elWelcomeTitle);
    let elWelcomeDescription = document.createElement("div");
    elWelcomeDescription.classList.add("box-description");
    elWelcomeDescription.innerHTML = description;
    elWelcomescreen.append(elWelcomeDescription);
    let elWelcomeButton = document.createElement("button");
    elWelcomeButton.innerHTML = buttonTile;
    elWelcomeButton.addEventListener("click", buttonAction);
    elWelcomescreen.append(elWelcomeButton);
  };
  // this.getBody = function () {
  //   for (let i = 0; i < this.answers.length; i++) {
  //     body += i + 1 + ". " + this.answers[i] + "\n";
  //   }
  // }
}

function Question(title, answers) {
  this.title = title;
  this.answers = answers;
  let counter = 0;
  this.getBody = function () {
    let body = this.title.toUpperCase() + "\n";
    for (let i = 0; i < this.answers.length; i++) {
      body += i + 1 + ". " + this.answers[i] + "\n";
    }
    return body;
  };
  this.addAnswer = function (answer) {
    // this.answers[this.answers.length] = answer
    this.answers.push(answer);
  };
  this.isCorrectAnswer = function (userAnswer) {
    if (this.correctAnswer == userAnswer) return true;
    else return false;
  };
  this.getElement = function () {
    // console.log(usuarios);
    
    let questionTitle = document.createElement("h3");
    questionTitle.innerHTML = this.title;
    elQuestionScreen.append(questionTitle);

    let questionAnswers = document.createElement("ul");
    questionAnswers.classList.add("question__awswers");

    this.answers.forEach((answer, index) => {
      let elAnswer = document.createElement("li");
      elAnswer.classList.add("awswer");
      elAnswer.innerHTML = !isNaN(answer)
        ? `${answer}. ${generatorStart(answer)}`
        : answer;
      elAnswer.id = index + 1;
      elAnswer.addEventListener("click", this.checkAnswer);
      questionAnswers.append(elAnswer);
    });
    elQuestionScreen.append(questionAnswers);
    let questionNumber = document.createElement("p");
    questionNumber.classList.add("txt-end");
    questionNumber.innerHTML = `Pregunta : ${quiz.counter++ + 1}`;
    elQuestionScreen.append(questionNumber);
  };

  this.checkAnswer = (event) => {
    let anwserSelected = event.target;
    anwserSelected.classList.add("answer-selected");

    // Condicionales de preguntas encuesta
    switch (quiz.indexCurrentQuestion) {
      case 0:
        if (Number(anwserSelected.id) > 8) {
          // console.log("entro al condicional 1");
          quiz.indexCurrentQuestion = 1;
        }
        break;
      case 3:
        // console.log("entro al condicional 2");
        if (Number(anwserSelected.id) === 1) {
          quiz.indexCurrentQuestion = 4;
        }
        break;
      case 4:
        // console.log("entro al condicional 3");
        if (Number(anwserSelected.id) < 4) {
          quiz.indexCurrentQuestion = 5;
        }
        break;
      case 6:
        // console.log("entro al condicional 4");
        if (Number(anwserSelected.id) === 2) {
          quiz.indexCurrentQuestion = 7;
        }
        break;
      case 8:
        // console.log("entro al condicional 5");
        if (Number(anwserSelected.id) === 2) {
          quiz.indexCurrentQuestion = 9;
        }
        break;

      default:
        break;
    }

    let answerUser = this.answers[Number(anwserSelected.id) - 1];
    usuarios.filter((usuario) => {
      if (usuario.id === ativeUser.id) {
        usuario.addAnswer.push({
          question: this.title,
          answer: answerUser,
        });
      }
    });

    // if (this.isCorrectAnswer(anwserSelected.id)) {
    //   quiz.counter++;
    // } else {
    //   anwserSelected.classList.add("answer--wrong");
    //   let elCorrectAnswer = document.getElementById(this.correctAnswer);
    //   elCorrectAnswer.classList.add("answer--correct");
    // }
    setTimeout(function () {
      elQuestionScreen.textContent = "";
      quiz.indexCurrentQuestion++;
      quiz.showCurrentQuestion();
    }, 1000);
  };
}
let quiz = new Quiz();

let question1 = new Question(
  `¿Recomendarías nuestro Ecommerce a un familiar o amigo?. <br> 
  <span class="subtitle-Question">(Donde 1 es nada recomendable y 10 es muy recomendable)</span>`,
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);
//Respuestas del 1 - 8
let question1_1 = new Question(
  "¿Cómo podríamos mejorar el servicio de nuestro Ecommerce ?",
  [
    "Mejorando los Cupones",
    "Mejorando ofertas y promociones",
    "Página web más amigable y fácil de usar",
    "Teniendo más alternativas en horarios de despachos",
  ]
);

//Respuesta del 9 o 10
let question1_2 = new Question(
  "¿Por qué calificas con buena nota nuestro Ecommerce?",
  [
    "Página Web rápida y fácil de usar",
    "Tiene las marcas o productos que necesito",
    "Pedido llega en el día y hora seleccionados",
    "Los productos no se agotan fácilmente",
  ]
);

let question2 = new Question(
  "Opinas que es fácil registrarse o hacer logan cuando vas a iniciar tu compra",
  ["si", "no"]
);
//Respuesta no
let question2_1 = new Question(
  "¿Como crees que podemos mejorar nuestro proceso de registro?",
  [
    "Mensajes mas claros",
    "menús mas fáciles de entender",
    "Solicitar menos datos al registrarse",
    "otro",
  ]
);
//Respuesta si
let question2_2 = new Question("¿Por qué te parece fácil registrarse?", [
  "integración con Google o Facebook",
  "Mensaje de validación llega rápido",
  "proceso intuitivo",
  "otro",
]);

let question3 = new Question("¿Tuviste algun problema en tu ultima compra?", [
  "si",
  "no",
]);

// si la respuesta es si
let question3_1 = new Question("¿Qué problema tuviste durante tu compra?", [
  "Fue muy difícil encontrar en el sitio los productos que buscaba",
  "El pedido llegó tarde",
  "Nunca recibí mi pedido",
  "No se aplicaron los descuentos",
]);
// su la respuesta es NO continua el flujo

let question4 = new Question(
  "Durante tu última compra, ¿hubo productos que buscaste y no encontraste en el sitio?",
  ["si", "no"]
);

//si la respuesta es si
let question4_1 = new Question("¿Que categoria de producto no encontraste?", [
  "Frutas y verduras",
  "Lacteos",
  "Congelados",
  "Carnes",
  "Despensa",
]);
//si es no continua el flujo

//Evalua del 0 al 10 los siguientes aspectos de nuestro Ecommerce:

let question5 = new Question(
  `¿La página de inicio me ayuda a comenzar fácilmente mi proceso de compra?.<br>
  <span class="subtitle-Question">(Donde 1 es muy dificil 10 muy facil)</span>
  `,
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);
let question6 = new Question(
  `¿Puedo saber fácilmente cuando es la fecha y horario de entrega más cercana, antes de armar el carro?.<br>
  <span class="subtitle-Question">(Donde 1 es muy dificil y 10 muy facil)</span>
  `,
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);
let question7 = new Question(
  `Califica la Buena disponibilidad de fechas y horarios para la entrega del pedido.<br>
  <span class="subtitle-Question">(Donde 1 es muy mala y 10 muy buena)</span>
  `,
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);
let question8 = new Question(
  `Califica la facilidad de encontrar los productos que necesito.<br>
  <span class="subtitle-Question">(Donde 1 es muy dificil y 10 muy facil )</span>`,
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);
let question9 = new Question(
  `Califica la variedad de productos disponibles en la página.<br>
 <span class="subtitle-Question">(Donde 1 es muy mal y 10 muy buena)</span>`,
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);
let question10 = new Question(
  `Califica la claridad de las ofertas y precios. <br>
  <span class="subtitle-Question">(Donde 1 es muy mal y 10 muy buena)</span>`,
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);
let question11 = new Question(
  `Califica el atractivo de las ofertas y precios disponibles en el sitio.<br>
  <span class="subtitle-Question">(Donde 1 es mala y 10 muy buena)</span>`,
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);
let question12 = new Question(
  `Califica la información proporcionada por los productos (fotografías, información, etc.)<br>
  <span class="subtitle-Question">(Donde 1 es mala y 10 muy buena)</span>`,
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);
let question13 = new Question(
  `Califica si el pedido llega en el día y hora seleccionada.<br>
  <span class="subtitle-Question">(Donde 1 es mala y 10 muy buena)</span>`,
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);
let question14 = new Question(
  `Califica la calidad y frescura de los productos.<br>
  <span class="subtitle-Question">(Donde 1 es mala calidad y 10 buena calidad)</span>`,
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);
let question15 = new Question(
  "Los productos frescos/congelados llegaron en buen estado",
  ["si", "no"]
);
let question16 = new Question(
  `Califica la amabilidad del personal de despacho.<br>
  <span class="subtitle-Question">(Donde 1 es nada amable y 10 muy amable)</span>`,
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);
let question17 = new Question("¿El pedido llega completo?", ["si", "no"]);
let question18 = new Question(
  `Califica la rapidez para completar tu compra en el sitio.<br>
  <span class="subtitle-Question">(Donde 1 es muy lento y 10 muy rapido)</span>`,
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);
let question19 = new Question(
  `Califica la facilidad de Pago.<br>
  <span class="subtitle-Question">(Donde 1 es muy dificil y 10 muy facil)</span>`,
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);
let question20 = new Question(
  `Califica la Modalidad de Pago.<br>
  <span class="subtitle-Question">(Donde 1 es muy dificil y 10 muy facil)</span>`,
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);
let question21 = new Question(
  "Dirías que tu última compra en nuestro Ecommerce fue",
  [
    "Una compra planificada, donde me abastecí de todo lo que necesito para mi hogar",
    "Una compra planificada de solo algunos productos que me faltaban (Reposición)",
    "Una compra para aprovechar ofertas y promociones",
    "Una compra de emergencia (No planificada)",
  ]
);

let input = `<input type="text" name="name" id="name" placeholder="Escribe tu nombre" />`;
let welcon1 = new Welcome(
  "Porfavor ingresa tu nombre",
  `${input}`,
  "Ingresar",
  welcon2
);
quiz.addWelcon(welcon1);
quiz.addQuestion(question1);
quiz.addQuestion(question1_1);
quiz.addQuestion(question1_2);
quiz.addQuestion(question2);
quiz.addQuestion(question2_1);
quiz.addQuestion(question2_2);
quiz.addQuestion(question3);
quiz.addQuestion(question3_1);
quiz.addQuestion(question4);
quiz.addQuestion(question4_1);
quiz.addQuestion(question5);
quiz.addQuestion(question6);
quiz.addQuestion(question7);
quiz.addQuestion(question8);
quiz.addQuestion(question9);
quiz.addQuestion(question10);
quiz.addQuestion(question11);
quiz.addQuestion(question12);
quiz.addQuestion(question13);
quiz.addQuestion(question14);
quiz.addQuestion(question15);
quiz.addQuestion(question16);
quiz.addQuestion(question17);

function welcon2() {
  let elName = document.getElementById("name");
  let name = elName.value;
  let UID = elName.id + Math.floor(Math.random() * 999999);

  // let nameId = elName.id;
  const personOne = new Usuarios(`${name}`, `${UID}`);

  if (name == "") {
    alert("Porfavor ingresa tu nombre");
  } else {
    ativeUser.name = name;
    ativeUser.id = UID;
    usuarios.push(personOne);
    let welcon2 = new Welcome(
      `Bienvenid@ <span class="name">${name}</span>`,
      `Esta encuesta tiene <span class="numberOfQuestions">${quiz.questions.length}</span> preguntas`,
      "Empezar",
      seeFirstQuestion
    );
    quiz.addWelcon(welcon2);
  }
}

function numberOfQuestions() {
  let elNumberOfQuestions = document.querySelectorAll(".numberOfQuestions");
  elNumberOfQuestions.forEach(function (elnumberofquestions) {
    elnumberofquestions.textContent = quiz.questions.length;
  });
}
numberOfQuestions();

function seeFirstQuestion() {
  let elWelcomeScr = document.getElementById("welcomescreen");
  elWelcomeScr.classList.add("hidden");
  quiz.showCurrentQuestion();
}

function finishQuiz() {
  let Divquiz = document.querySelector(".quiz");
  let DivResult = document.querySelector(".result");
  Divquiz.classList.remove("w100");
  DivResult.classList.remove("wg");
  quiz.indexCurrentQuestion = 0;
  elScreenResult.classList.add("hidden");
  elWelcomescreen.classList.remove("hidden");
  quiz.addWelcon(welcon1);
  quiz.counter = 0;
}

function craateBodyResult(answers) {
  let body = "";
  answers.map((answer, index) => {
    body += `
    <div class="box-answer">
      <p class="question">${index + 1}. ${answer.question}</p>
      <div class="answer">
        ${
          !isNaN(answer.answer)
            ? `${answer.answer}. ${generatorStart(answer.answer)}`
            : answer.answer
        }
      </div>
    </div>
    `;
  });
  return body;
}

function showResult(elResult) {
  let Divquiz = document.querySelector(".quiz");
  let DivResult = document.querySelector(".result");
  Divquiz.classList.add("w100");
  DivResult.classList.remove("wg");
  let resultActiveUser = usuarios.filter(
    (usuario) => usuario.id === ativeUser.id
  );
  elResult.innerHTML = `
  <p class="title">${resultActiveUser[0].firstName}</p>
  <p class="description">Preguntas contestadas ${
    resultActiveUser[0].addAnswer.length
  }</p>   
  ${craateBodyResult(resultActiveUser[0].addAnswer)}   
  `;
}

function otherResult(elResult) {
  let Divquiz = document.querySelector(".quiz");
  
  if (usuarios.length > 1) {    
    let otherUsers = usuarios.filter((usuario) => usuario.id !== ativeUser.id);
    let body = "";
    otherUsers.map((usuario) => {
      body += `
      <div class="box-user">      
      <p class="title">${usuario.firstName}</p>
      <p class="description">Preguntas contestadas ${
        usuario.addAnswer.length
      }</p>
      ${craateBodyResult(usuario.addAnswer)}
      </div>
      `;
    });
    // console.log('body:', body)
    elResult.innerHTML = `
    <p class="title-otherResults">Respuestas de otros Usuarios</p>
      ${body}	
    `;
  }
  if(usuarios.length > 2){
    Divquiz.classList.add("w100");
    elResult.classList.add("wg");
  }
}

function generatorStart(item) {
  let star = "";
  if (!isNaN(item)) {
    for (let i = 0; i < item; i++) {
      star =
        star +
        `<span class="star-answer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
          </svg>
        </span>
        `;
    }
  }
  return star;
}
