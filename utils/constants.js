const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/i;
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i;
const nameLengthErr = 'Длина имени должна быть не менее двух и не более тридцати символов.';
const badUrlErr = 'Передана некорректная URL ссылка.';
const ownerRigthsErr = 'Недостаточно прав для удаления данных.';
const movieIdMissing = 'Фильм с указанным id не найден.';
const badValue = 'Переданы некорректные данные.';
const usersIdMissing = 'Пользователь с указанным id не найден.';
const wrongEmail = 'Введен неверный имейл.';
const emailTaken = 'Пользовател с таким имейлом уже существует.';
const badEmailOrPass = 'Неверная почта или пароль.';
const nameMissing = 'Отсутствует обязательное поле "Имя".';
const wrongPath = 'Не смотри, я не накрашена!';
const connected = 'Successfully Connected to DB';
const notConnected = 'Connection to DB Failed';

module.exports = {
  nameLengthErr,
  badUrlErr,
  ownerRigthsErr,
  movieIdMissing,
  badValue,
  usersIdMissing,
  wrongEmail,
  emailTaken,
  badEmailOrPass,
  nameMissing,
  wrongPath,
  connected,
  notConnected,
  linkRegex,
  emailRegex,
};
