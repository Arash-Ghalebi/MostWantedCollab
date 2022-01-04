"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
let globalMulti = false
let searchResults;
let z = true;
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      let answer = promptFor("what trait would you like search? gender, date of birth, height, weight, eyecolor, occupation, or multiple",traitswitch).toLowerCase();
        switch(answer){
          case 'gender':
            searchResults = searchByGender(people);
            break;
          case 'date of birth':
            searchResults = SearchByDob(people);
            break;
          case 'height':
            searchResults = searchByHeight(people);
            break;
          case 'weight':
            searchResults = searchByWeight(people);
            break;
          case "eyecolor":
            searchResults = searchByEyeColor(people);
            break;
          case "occupation":
            searchResults = searchByOccupation(people);
            break;
          case "multiple":
            searchResults = searchMultiple(people);
            break;

  
        }
      
      
      break;
      default:
    app(people); // restart app
      break;
  }
  mainMenu(searchResults, people);
}
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for



// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'siblings', 'spouse', 'parents' , or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
    // TODO: get person's info
      alert("Gender: " + person.gender + " " + "DOB: " + person.dob + " " + "Height: " + person.height + " " + "Weight: " + person.weight + " " + "Eye Color: " + person.eyeColor + " " + "Occupation: " + person.occupation);

    break;
    case "parents":
      let parents = people.filter(function(element){

          if (person.parents[0] === element.id || person.parent[1] === element.id){
          return true;
          }
          else{ 
          return false;
          }
      })

      
      // family.unshift(person);
      displayPeople(parents);
      break;

    case "siblings":

      let siblings = people.filter(function(element){
        if(person.parents[0] === element.parents[0] && person.firstName !== element.firstName){
          return true;
        }
        else{
          return false;
        }
      })
      displayPeople(siblings);
      break;

    case "spouse":
      let spouse = people.filter(function(element){
        if(person.currentSpouse === element.id){
          return true;
        }
        else{
          return false;
        }
      })
      displayPeople(spouse);
      break;
      


    case "descendants":
      let child = people.filter(function(ele){
        for (let x = 0; x< ele.parents.length; x++)
          if (person.id == ele.parents[x]){
            return true;
          }
        else{
          return false;
        }
        
      })
      displayPeople(child);
      break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchMultiple(people){
  searchResults=people
  globalMulti = true
  while (z == true){
    let pick = promptFor("Which traits do you want to filter by? gender, date of birth, height, weight, eyecolor, occupation, or done", autoValid);

    switch(pick){
      case 'gender':
        searchResults = searchByGender(searchResults);
        break;
      case 'date of birth':
        searchResults = SearchByDob(searchResults);
        break;
      case 'height':
        searchResults = searchByHeight(searchResults);
        break;
      case 'weight':
        searchResults = searchByWeight(searchResults);
        break;
      case "eyecolor":
        searchResults = searchByEyeColor(searchResults);
        break;
      case "occupation":
        searchResults = searchByOccupation(searchResults);
        break;
      case "done":
        displayPeople(people)
        z = false;
        return searchByName(searchResults);
    }


  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundind;
  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  foundind = foundPerson[0];
  mainMenu(foundind, people);
  // TODO: find the person single person object using the name they entered.
  //return foundPerson;
}

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people){
  let eyeColor = prompt("type the color of persons eyes here")
  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.eyeColor === eyeColor){
      return true;
    }
    else{
      return false;
    }
  })
  if (globalMulti == true){
    searchMultiple(foundPerson)
  }
  else{
    displayPeople(foundPerson)
  }
}

function searchByGender(people){
  let gender = prompt("type the gender of the person")
  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.gender === gender){
      return true;
    }
    else{
      return false;
    }
  })
  if (globalMulti == true){
    searchMultiple(foundPerson)
  }
  else{
    displayPeople(foundPerson)
  }
}


function SearchByDob(people){
  let dob = prompt("type the date of birth of person MM/DD/YYYY ")
  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.dob === dob){
      return true;
    }
    else{
      return false;
    }
  })
  displayPeople(foundPerson)
}

function searchByHeight(people){
  let height = prompt("type the height of person in inches")
  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.height == height){
      return true;
    }
    else{
      return false;
    }
  })
  displayPeople(foundPerson)
}


function searchByWeight(people){
  let weight = prompt("type the weight of person in pounds")
  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.weight == weight){
      return true;
    }
    else{
      return false;
    }
  })
  displayPeople(foundPerson)
}

function searchByOccupation(people){
  let occupation = prompt("type the occupation of person")
  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.occupation === occupation){
      return true;
    }
    else{
      return false;
    }
  })
  displayPeople(foundPerson)
}

//TODO: add other trait filter functions here.



//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  // let relations = new Array[people.length]
  // relations[0] = "index";
  // for(let y = 1; y < relations.length; y++){
  //   if people[0].
  // }
  // if(people[0].id == )
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName; //+ " " + relations[x]
    // if(x < relations.length){
    //   x++;
    // }
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}
function traitswitch(input){
  if(input.toLowerCase() == "gender" || input.toLowerCase() == "date of birth"|| input.toLowerCase() == "eyecolor" 
  || input.toLowerCase() == "occupation"|| input.toLowerCase() == "height"|| input.toLowerCase() == "weight" || input.toLowerCase() == "multiple"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

//#endregion