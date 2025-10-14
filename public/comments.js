import global, { config } from "/config.js";

global();

async function getComments() {
  const res = await fetch('/comment/get', { method: 'POST' });
  const list = await res.json();
  list.forEach((e, i) => {
    console.log(e);
  });
}

getComments()