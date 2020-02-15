import React from 'react';
// import FullPageSpinner from '../components/FullPageSpinner';

export const AuthContext = React.createContext();

export default function AuthProvider(props) {
  // const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false);

  const auth = {
    isAuth: false,
    user: null,
  };

  // React.useLayoutEffect(() => {
  //   if (isSettled) {
  //     setFirstAttemptFinished(true);
  //   }
  // }, [isSettled]);

  // if (!firstAttemptFinished) {
  //   if (isPending) {
  //     return <FullPageSpinner />;
  //   }
  //   if (isRejected) {
  //     return (
  //       <div css={{ color: 'red' }}>
  //         <p>Uh oh... There's a problem. Try refreshing the app.</p>
  //         <pre>{error.message}</pre>
  //       </div>
  //     );
  //   }
  // }

  // const login = form => authClient.login(form).then(reload);
  // const register = form => authClient.register(form).then(reload);
  // const logout = () => authClient.logout().then(reload);

  return <AuthContext.Provider value={auth} {...props} />;
}

AuthProvider.defaultProps = {
  isRejected: false,
  isPending: false,
  isSettled: false,
  reload: () => {},
};

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}
