const USER_DATA_KEY = "userData";

function getUserData() {
  const data = localStorage.getItem(USER_DATA_KEY);
  return data ? JSON.parse(data) : {};
}

function saveUserData(userData) {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
}

function appendToUserData(newData) {
  const userData = getUserData();
  const updatedData = { ...userData, ...newData };
  saveUserData(updatedData);
}

function clearUserData() {
  localStorage.removeItem(USER_DATA_KEY);
}
