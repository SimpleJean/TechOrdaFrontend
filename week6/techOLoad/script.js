const fileLoad = document.querySelector('#file-load');
const submit = document.querySelector('.submit');
const output = document.querySelector('.output');

let promises = [];
let counter = 1;
output.innerText = 'No files selected!';

fileLoad.addEventListener('change', () => {
  const files = fileLoad.files;

  if (files) {
    output.innerText = '';
  }

  for (const file of files) {
    let formData = new FormData();
    formData.append('file', file);
    promises.push(file);
    output.innerText += `\n ${counter++} ${file.name}, size is ${
      file.size
    } bytes`;
  }
});

function sendFiles(events) {
  events.preventDefault();

  if (promises.length === 0) return;
  counter = 1;

  Promise.allSettled(promises).then((files) => {
    setTimeout(() => {
      output.innerText = '';
      for (const file of files) {
        console.log(file.status);
        console.log(file.value.name);

        output.innerText += `\n 
        ${counter++}. Status is ${file.status} and
        ${file.value.name} was send`;
      }
    }, 3000);
  });
}

submit.addEventListener('click', sendFiles);
