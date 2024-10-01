const fs = require("fs");

const inputFile = "10000-most-common-passwords.csv";
const outputFile = "statistics.csv";
const delimiter = ",";

const passwordLengths = {};


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
    const key = element[1].length;

    if(passwordLengths[key]) {
      passwordLengths[key]++;
    } else {
      passwordLengths[key] = 1;
    }
  }
  console.log(passwordLengths);

  Object.keys(passwordLengths).forEach(key => {
    fs.appendFileSync(outputFile, `Chars: ${key}  Count:${passwordLengths[key]}\n`);
  });
}

// Main execution
deleteExistingOutputFile(); 
processData();
