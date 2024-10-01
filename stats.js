const fs = require("fs");

const inputFile = "10000-most-common-passwords.csv";
const outputFile = "statistics.csv";
const delimiter = ",";

const passwordLengths = {};
const passwordStartsWith = {};


function deleteExistingOutputFile() {
  if (fs.existsSync(outputFile)) {
    fs.unlinkSync(outputFile);
  }
}

function processData() {
  const data = fs.readFileSync(inputFile, "utf-8");
  const lines = data.split(/\n/);

  for(const line of lines) {  
    const element = line.split(delimiter); 
    const keyNum = element[1].length;

    passwordLengths[keyNum] ? passwordLengths[keyNum]++ : passwordLengths[keyNum] = 1;
  }

  for(const line of lines) {
    const element = line.split(delimiter);
    const keyLet = element[1][0];

    passwordStartsWith[keyLet] ? passwordStartsWith[keyLet]++ : passwordStartsWith[keyLet] = 1;
  }
  fs.appendFileSync(outputFile, `\nPassword Lengths: \n`);
  Object.keys(passwordLengths,passwordStartsWith).forEach(key => {
    fs.appendFileSync(outputFile, `Chars: ${key}  Count:${passwordLengths[key]}\n`);
    fs.appendFileSync(outputFile, `Chars: ${key}  Count:${passwordStartsWith[key]}\n`);
  });

  fs.appendFileSync(outputFile, `\nStarts With: \n`);

  Object.keys(passwordStartsWith).forEach(key => {
    fs.appendFileSync(outputFile, `Chars: ${key}  Count:${passwordStartsWith[key]}\n`);
  });
}

// Main execution
deleteExistingOutputFile(); 
processData();
