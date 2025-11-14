import supabase from './database.js';

async function getUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*');

  if (error) {
    console.error('Ошибка запроса:', error);
  } else {
    console.log('Данные:', data);
  }
}

getUsers();
