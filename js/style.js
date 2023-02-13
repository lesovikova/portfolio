//SEt typing animation

let i = 0;
let txt = 'My name is Anna Lisovykova'; /* The text */
const speed = 50; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
  if (i < txt.length) {
    document.querySelector(".header__title").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
typeWriter();

//sliding menu
$('.menu-btn').on('click', function() {
    $('.menu').toggle(500);
    $('.menu-btn').toggleClass('btn-closed');
});


//form validation

const firstName = document.getElementById('first_name');
const lastName = document.getElementById('last_name');
const email = document.getElementById('email');
const msgSubject = document.getElementById('msg_subject');
const textMessage = document.getElementById('text_message');

const form = document.getElementById('form');


// prevent the form from submitting
// form.addEventListener('submit', function (e) {
    
//     e.preventDefault();
// });


//The following isRequired() function returns true if the input argument is empty:
const isRequired = value => value === '' ? false : true;

//The following isBetween() function returns false if the length argument is not between the min and max argument:
const isBetween = (length, min, max) => length < min || length > max ? false : true;

//check if email is valid
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};


// highlights the border of the input field and displays an error message if the input field is invalid:
const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('span');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('span');
    error.textContent = '';
}


//The function returns true if the field passes the checks.
const checkMessage = () => {
    let valid = false;
    const inputMessage = textMessage.value.trim();
    if (!isRequired(inputMessage)) {
        showError(textMessage, 'Message can not be blank');
    }
    else {        
    showSuccess(textMessage);
    valid = true;
    }
    return valid;
}
const checkFirstName = () => {

    let valid = false;
    const min = 3,
        max = 25;
    const inputFirstName = firstName.value.trim();

    if (!isRequired(inputFirstName)) {
        showError(firstName, 'First name cannot be blank.');
    } else if (!isBetween(firstName.length, min, max)) {
        showError(firstName, `First name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(firstName);
        valid = true;
    }
    return valid;
}

const checkLastName = () => {

    let valid = false;
    const min = 2,
        max = 25;
        const inputLastName = lastName.value.trim();

    if (!isRequired(inputLastName)) {
        showError(lastName, 'Last name cannot be blank.');
    } else if (!isBetween(lastName.length, min, max)) {
        showError(lastName, `Last name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(lastName);
        valid = true;
    }
    return valid;
}


const checkEmail = () => {
    let valid = false;
    const inputemail = email.value.trim();
    if (!isRequired(inputemail)) {
        showError(email, 'Email cannot be blank.');
    } else if (!isEmailValid(inputemail)) {
        showError(email, 'Email is not valid.')
    } else {
        showSuccess(email);
        valid = true;
    }
    return valid;
}


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate forms
    let isFirstNameValid = checkFirstName(),
        isLastNameValid = checkLastName(),
        isEmailValid = checkEmail(),
        isMessageValid = checkMessage();

    let isFormValid = isFirstNameValid && isLastNameValid &&
        isEmailValid ;

    // submit to the server if the form is valid
    if (isFormValid) {
        document.querySelector('.contact__after').classList.remove('is-hidden');
        document.querySelector('.contact__after').textContent = 'Thank you for your message';
        e.target.reset();
                 
            }
    
});
