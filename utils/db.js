function setKey(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getKey(key) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

function clearKey(key) {
  localStorage.removeItem(key);
}

function clearAllKeys() {
  localStorage.clear();
}
