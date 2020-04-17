document.write('<p>Stars Wars API</p>');


/* Аналогичные контсуркции. Эквивалентный код */
/* Этот функционал доступн в браузере из коробки */

/* Вариант 1 */
fetch('https://swapi.dev/api/people/1/')
    .then((response) => {
        console.log(response);
        return response.json();
    })
    .then((body) => {
        console.log(body);
        return body;
    });

/* Вариант 2 */
/* Этот вариант лучше */
/* Асинхронная функция. */
const getResource = async (url) => {
    const res    = await fetch(url);    // await - ждать пока результат ПРОМИСА не станет доступен
    // Как только результат станет доступен, он попадет в переменную `res`


    const body  = await res.json(); // Та же схема

     body;
};

getResource('https://swapi.dev/api/people/1/').then((body) => {
    console.log(body);
});