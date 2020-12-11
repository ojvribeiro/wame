let greeting;
let text = document.getElementById('text');
const phone = document.getElementById('phone');
const business = document.getElementById('business');
const name = document.getElementById('name');
const submit = document.getElementById('submit');
const operator = document.getElementById('operator');

// Identificadores de Data e Hora atuais
now = new Date(),
hour = now.getHours();

function getGreeting() {
  // Saudações dependentes do horário
  if (hour >= 0 && hour < 6) {
    greeting = 'boa madrugada';
  }
  else if (hour >= 6 && hour < 12) {
    greeting = 'bom dia';
  }
  else if (hour >= 12 && hour < 18) {
    greeting = 'boa tarde';
  }
  else {
    greeting = 'boa noite';
  }
}

getGreeting();

document.querySelectorAll('input, textarea, select').forEach((el) => {
  el.addEventListener('input', function () {
    showResult(text.value);
  });
});

document.querySelectorAll('input, textarea, select').forEach((el) => {
  el.addEventListener('focus', function () {
    this.select();
  });
});

submit.addEventListener('click', function () {
  openWaMe(phone.value, business.value, name.value, text.value, operator.value);
});

function openWaMe(phone, business, name, text, operator) {
  let _text = text;
  let _phone = phone;

  _text = _text.replace(/\{empresa\}/gim, `${business}`);
  _text = _text.replace(/\{nome\}/gim, `${name}`);
  _text = _text.replace(/\{eu\}/gim, `${operator}`);
  _text = _text.replace(/\{saudação\}/gim, `${greeting}`);
  _text = _text.replace(/\&/gim, `%26`);
  _text = _text.replace(/\?/gim, `%3F`);

  if (phone.length > 0) {
    _phone = _phone.replace(/(\s|-|\(|\)|\.)/gim, '')
    window.open(`https://wa.me/55${_phone}/?text=${_text}&app_absent=1`, '_new')
  }
  else {
    window.open(`https://wa.me/?text=${_text}&app_absent=1`, '_new')
  }
  
  phone.focus();
  phone.select();
}

function showResult(text) {
  let _text = text;

  getGreeting();

  // Replaces links
  _text = _text.replace(
    /([--:\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\w+)=(?:\w+))+|[--:\w?@%&+~#=]+)?/gim,
    `<a href="$1">$1</a>`
  );

  _text = _text.replace(/\{empresa\}/gim, `<span class="text-info pointer" onclick="${business.id}.focus(); ${business.id}.select();">${business.value}</span>`);

  _text = _text.replace(/\{nome\}/gim, `<span class="text-info pointer" onclick="${name.id}.focus();${name.id}.select();">${name.value}</span>`);

  _text = _text.replace(/\{eu\}/gim, `<span class="text-info pointer" onclick="${operator.id}.focus();">${operator.value}</span>`);

  _text = _text.replace(/\{saudação\}/gim, `<span class="text-info">${greeting}</span>`);

  _text = _text.replace(/\*(.*?)\*/gim, '<strong>$1</strong>');

  _text = _text.replace(/_(.*?)_/gim, '<i>$1</i>');

  _text = _text.replace(/```(.*?)```/gim, '<code>$1</code>');

  result.innerHTML = _text;
}

showResult(text.value);
