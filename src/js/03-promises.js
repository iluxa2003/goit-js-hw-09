import Notiflix from 'notiflix';
const subButton = document.querySelector('button[type=submit]');
const delay = document.querySelector('input[name=delay]');
const step = document.querySelector('input[name=step]');
const amount = document.querySelector('input[name=amount]');
const form = document.querySelector('.form');
// position, delay
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  // if (shouldResolve) {
  //   // Fulfill
  //   Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  // } else {
  //   // Reject
  //   Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  // }
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  return promise;
}
function repetable() {
  // for(let i = 0; i<parseInt(amount.value) ;i++){
  // const special = (parseInt(delay.value) + parseInt(step.value)*i)
  //   // const special = delay.value + step.value*i
  //   setTimeout(createPromise,special,i+1, special)
  // }
  for (let i = 0; i < parseInt(amount.value); i++) {
    const special = parseInt(delay.value) + parseInt(step.value) * i;
    createPromise(i + 1, special)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
}
const starting = event => {
  event.preventDefault();
  repetable();
};
form.addEventListener('submit', starting);
