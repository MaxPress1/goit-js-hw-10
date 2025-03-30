import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('form');

form.addEventListener('submit', makePromise);

function makePromise(evt) {

    evt.preventDefault();

    const delay = Number(form.elements.delay.value);
    const resultPromise = form.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (resultPromise === 'fulfilled') {
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            } else if (resultPromise === 'rejected') {
                reject(`❌ Rejected promise in ${delay}ms`);
            }
        }, delay);
    });
    promise
        .then((message) => {
            iziToast.success({
                message: message,
                position: "topRight",
            });
        })
        .catch((message) => {
            iziToast.error({
                message: message,
                position: "topRight",
            });
        });
};
