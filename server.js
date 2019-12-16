var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

  app.get('/', function (req, res) {
    let query = req.query.q;
    if(query == 'PING'){
      res.send('PONG')
    } else if(query == 'What is your name?'){
      res.send('Chris Carlson')
    } else if(query == 'What is your quest?'){
      res.send('coding')
    } else if(query.includes('+')){
      //SPLIT INTO INDIVIUAL NUMBERS
      let numbers = query.split('+')
      let regex = /\D+/gm;
      let sum = 0;
      let subStr = ''
      numbers.forEach(number => {
        //CLEAN OUT SPACES, =, AND ?
        let tempNum = Number(number.replace(regex, subStr))
        //ADD TO THE RETURN TOTAL
        sum += tempNum;
      });
      res.send('' + sum);
    } else if(query == 'Source code for this exercise?'){
      res.send('https://github.com/ChristopherMCarlson/coding-exercise'); 
    }else if(!query.includes('?') && !query.includes("<")){
      //GET THE FIRST NUMBER(THE NUMBER OF WORDS IN THE QUERY)
      let queryLength = query.split(' ').length;
      //CONVERT THE INPUT TO A SINGLE STRING OF LOWER CASE LETTERS TO EVALUATE EACH
      let evalArr = query.split(' ').join('').toLowerCase().split('');
      let vowels = 0;
      let consonants = 0
      evalArr.forEach(letter => {
        //CHECK IF THE LETTER IS A VOWEL
        if(/^[aeiou]$/.test(letter)){
          vowels++
        } else {
          consonants++
        }
      });
      res.send(queryLength + '-' + consonants + '-' + vowels)
    } else if(query.startsWith('<')){
      let returnString = ''
      //CREATE AN ARRAY OF ALL EVEN NUMBERS FROM LARGEST TO SMALLEST
      let evenArr = query.split(' ').filter(function(value, index, arr){
        return value % 2 == 0;
    }).sort(function(a, b){return b-a})
    //CREATE AN ARRAY OF ALL ODD NUMBERS FROM SMALLEST TO LARGEST
      let oddArr = query.split(' ').filter(function(value, index, arr){
        return value % 2 != 0 && value % 1 == 0;
    }).sort(function(a, b){return a-b})
    for (let i = 0; i < oddArr.length; i++) {
      //ADD THE TWO ARRAYS IN THE SAME INDEX
      returnString += Number(oddArr[i]) + Number(evenArr[i])
      //CONCATNATE A SPACE
      returnString += ' '
    }
    //RETURN A STRING OF ALL THE SUMS WITH THE FINAL SPACE REMOVED
    res.send(returnString.replace(/\s+$/, ''))
    } else if(query.startsWith(' ABC')){
      res.send('Some kind of codebreaker test?')
    }else {
      res.send('Error');
    }
  })

app.listen(port);

console.log('coding-exercise RESTful API server started on: ' + port);