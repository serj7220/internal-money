import {Environment} from './interface';

export const environment: Environment = {
  production: true,
  DbLoginUrl: "http://193.124.114.46:3001/sessions/create",
  DbCreateUserUrl: "http://193.124.114.46:3001/users",
  DbUserInfoUrl: "http://193.124.114.46:3001/api/protected/user-info",
  DbListTransUrl: "http://193.124.114.46:3001/api/protected/transactions",
  DbTransUrl: "http://193.124.114.46:3001/api/protected/transactions",
  DbListUsers: "http://193.124.114.46:3001/api/protected/users/list"
};
