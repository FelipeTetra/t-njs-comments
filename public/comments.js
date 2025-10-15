import global, { config } from "/config.js";
global();

const tbody = document.getElementById('tb')

async function getComments() {
  const res = await fetch('/comment/get', { method: 'POST' });
  const list = await res.json();
  list.forEach((e) => {
    const newtr = document.createElement('tr')
    const newtd = document.createElement('td')
    newtd.innerText = e[0];
    const newtd2 = document.createElement('td')
    newtd2.innerText = e[1];

    tbody.append(newtr);
    newtr.append(newtd, newtd2);
  });
}

getComments()