const prompt = "Write a story about a magic backpack.";

async function generate(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return parseInt(result.response.text(), 10); // Parse the score as an integer
  } catch (err) {
    console.error("Error", err);
    return 0;
  }
}

////////////////////////////////
let questions = [
  "What is JavaScript?",
  "How do you declare a variable in JavaScript?",
  "What is the difference between `let`, `var`, and `const`?",
  "What are JavaScript promises?",
  "Explain the concept of closures in JavaScript.",
  "What is the difference between `==` and `===` in JavaScript?",
  "How does event delegation work?",
  "What is the purpose of `async` and `await` in JavaScript?",
  "How can you manipulate the DOM using JavaScript?",
  "What is the `this` keyword in JavaScript and how is it used?",
];
let size = questions.length;
let index = 0;
let questionSpan = document.getElementById("question");
let prevBtn = document.getElementById("previous");
let submitBtn = document.getElementById("submit");
let nextBtn = document.getElementById("next");
let textArea = document.getElementById("myTextArea");
window.onload = loading;

function loading() {
  questionSpan.innerHTML = questions[index];
}

nextBtn.addEventListener("click", () => {
  if (index >= 0 && index < size - 1) {
    console.log("next-Clicked");
    index++;
    textArea.value = "";
    loading();
  } else {
    alert("this is the last question");
  }
});

prevBtn.addEventListener("click", () => {
  if (index > 0 && index <= size - 1) {
    console.log("prev-Clicked");
    index--;
    loading();
  } else {
    alert("this is the first question");
  }
});

let score = 0;

submitBtn.addEventListener("click", async () => {
  let answer = textArea.value;
  let question = questionSpan.innerHTML;
  if (answer.length > 0) {
    let prompt = `On a scale of 1 to 10, rate the quality of this answer: 
  Question: "${question}" 
  Answer: "${answer}"
  Just give me the number between 1 and 10.`;

    let resultScore = await generate(prompt);
    score += resultScore;

    console.log(`Score after this question: ${score}`);
    if (index >= 0 && index < size - 1) {
      console.log("next-Clicked");
      index++;
      textArea.value = "";
      loading();
    }
  }
  textArea.value = "";
  if (index == size - 1) {
    alert(`your total score out of 100 is : ${score}`);
  }
});
