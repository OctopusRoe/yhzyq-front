import axios from 'axios'
import rest from './restful'

export const loadUserGroups = (state, result) => {
  let list = result;
  let groups = [];
  list.forEach(e => {
    let group = {
      id: e.id,
      name: e.name
    };
    groups.push(group);
  });
  state.userGroups = groups;
}

export const loadUsers = (state, result) => {
  let list = result;
  let users = [];
  list.forEach(e => {
    users.push(e);
  });
  state.users = users;
}
