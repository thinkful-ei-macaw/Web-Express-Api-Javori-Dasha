const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));

//Drill 1
app.get("/sum", (req, res) => {
  const { a, b } = req.query;

  if (!a) {
    return res.status(400).send("a is required");
  }
  if (!b) {
    return res.status(400).status("b is required");
  }
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  if (Number.isNaN(numA)) {
    return res.status(400).send("a must be a number");
  }

  if (Number.isNaN(numB)) {
    return res.status(400).send("b must be a number");
  }

  const c = numA + numB;

  const responseString = `The sum of ${numA} and ${numVB} is ${c}`;
  res.status(200);
  res.send(responseString);
});

app.listen(8000, () => {
  console.log("Express server is listening on port 8000!");
});

//Drill 2
app.get("/cipher", (req, res) => {
  const { text, shift } = req.query;

    if (!text) {
      return res.status(400).send("text is required!");
    }

    if (!shift) {
      return res.status(400).send("shift is required");
    }

  const numShift = parseFloat(shift);
  if (Number.isNaN(numShift)) {
    return res.status(400).send("shift must be a number");
  }
  const base = "A".charCodeAt(0);

  const cipher = text
    .toUpperCase()
    .split(" ")
    .map(char => {
      const code = char.charCodeAt(0);
      if (code < base || code > base + 26) {
        return char;
      }
      let diff = code - base;
      diff = diff + numShift;
      diff = diff % 26;

      const shiftedChar = String.fromCharCode(base + diff);
      return shiftedChar;
    })
    .join(" ");
  res.status(200).send(cipher);
});

//drill 3

app.get("/lotto", (req, res) => {

  const { numbers } = req.query;
  const randomGeneratedNumbers = [...Array(6)].map(() => Math.floor(Math.random() * 20));

console.log(randomGeneratedNumbers);
  if(!numbers) {
    return res
      .status(400)
      .send("numbers is required");
  }

  if(numbers.length >= 6) {
    return res.status(400).send("Please insert 6 numbers or less")
  }

  for(let i=0; i<numbers.length; i++) {
    if(numbers[i] >= 20 || numbers < 0) {
      return res.status(400).send("All numbers need to be less than 20")
    }
  }


  const guesses = numbers.map(n => parseInt(n))
  .filter(n => !Number.isNaN(n) && (n >= 1 && n <= 20));
  
  console.log(guesses);
 
  let diff = randomGeneratedNumbers.filter(n => !guesses.includes(n));




  let responseText;

  switch(diff.length){
    case 0: 
      responseText = 'Wow! Unbelievable! You could have won the mega millions!';
      break;
    case 1:   
      responseText = 'Congratulations! You win $100!';
      break;
    case 2:
      responseText = 'Congratulations, you win a free ticket!';
      break;
    default:
      responseText = 'Sorry, you lose';  
  }

  res.json({
    numbers,
    randomGeneratedNumbers,
    diff,
    responseText
  })

  res.status(200);
  res.send(responseText);
})


