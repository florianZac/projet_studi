(() => {
  const password = document.getElementById('password');
  const toggle = document.getElementById('togglePassword');
  const submitBtn = document.getElementById('submitBtn');
  const passwordCriteriaDiv = document.getElementById('passwordCriteria');

  const email = document.getElementById('email');
  const emailError = document.getElementById('emailError');

  const phone = document.getElementById('phone');
  const phoneError = document.getElementById('phoneError');

  const passwordCriteria = {
    length: document.getElementById('length'),
    uppercase: document.getElementById('uppercase'),
    lowercase: document.getElementById('lowercase'),
    number: document.getElementById('number'),
    special: document.getElementById('special')
  };

  const regexesPassword = {
    length: /.{8,}/,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    number: /[0-9]/,
    special: /[!@#$%^&*(),.?":{}|<>]/
  };

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPhone = /^[0-9]{10}$/;

  // Afficher la bulle mot de passe
  password.addEventListener('focus', () => passwordCriteriaDiv.classList.remove('d-none'));
  password.addEventListener('blur', () => passwordCriteriaDiv.classList.add('d-none'));

  const validatePassword = () => {
    let valid = true;
    Object.keys(passwordCriteria).forEach(key => {
      if (regexesPassword[key].test(password.value)) {
        passwordCriteria[key].classList.add('valid', 'text-success');
        passwordCriteria[key].classList.remove('text-black');
        passwordCriteria[key].querySelector('i').className = 'bi bi-check-circle me-1';
      } else {
        passwordCriteria[key].classList.remove('valid', 'text-success');
        passwordCriteria[key].classList.add('text-black');
        passwordCriteria[key].querySelector('i').className = 'bi bi-x-circle me-1';
        valid = false;
      }
    });
    return valid;
  };

  const validateEmail = () => {
    if (regexEmail.test(email.value)) {
      emailError.classList.remove('d-block');
      emailError.classList.add('d-none');
      email.classList.remove('is-invalid');
      return true;
    } else {
      emailError.classList.remove('d-none');
      emailError.classList.add('d-block');
      email.classList.add('is-invalid');
      return false;
    }
  };

  const validatePhone = () => {
    if (regexPhone.test(phone.value)) {
      phoneError.classList.remove('d-block');
      phoneError.classList.add('d-none');
      phone.classList.remove('is-invalid');
      return true;
    } else {
      phoneError.classList.remove('d-none');
      phoneError.classList.add('d-block');
      phone.classList.add('is-invalid');
      return false;
    }
  };

  const validateForm = () => {
    const isValid = validatePassword() && validateEmail() && validatePhone();
    submitBtn.disabled = !isValid;
  };

  // Events
  password.addEventListener('input', validateForm);
  email.addEventListener('input', validateForm);
  phone.addEventListener('input', validateForm);

  toggle.addEventListener('click', () => {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    const icon = toggle.querySelector('i');
    icon.className = type === 'password' ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill';
  });

})();
