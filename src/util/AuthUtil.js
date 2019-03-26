export const isActiveUser = (authUser) => authUser && authUser.active;

export const isAdmin = (authUser) => authUser && authUser.roles.includes('ADMIN');
