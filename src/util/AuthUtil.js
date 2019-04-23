export const isActiveUser = (authUser) => authUser && authUser.active;

export const isAdmin = (authUser) => authUser && authUser.isAdmin;

export const isStrongPassword = (value) => {
  const minimalRequiredPasswordRegex = /^(?=.*?[A-ZÖÄÜÕŽŠ])(?=.*?[a-zöäüõžš])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/;
  return minimalRequiredPasswordRegex.test(value);
};
