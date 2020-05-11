export function signIn() {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          token: 'V5hHCapHltbUq3BmUVNbgGdlL92bgjfp',
          user: {
            name: 'Faustop',
            email: 'faustinho@globo.com',
          },
        }),
      1500
    )
  );
}
