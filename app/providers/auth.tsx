import React, {Component, createContext} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

interface AuthContextI {
  currentUser: FirebaseAuthTypes.User | null;
  isLoading: boolean;
}
const INITIAL_STATE: AuthContextI = {
  currentUser: null,
  isLoading: true,
};

export const AuthContext = createContext(INITIAL_STATE);
class AuthProvider extends Component<{}, AuthContextI> {
  state = {...INITIAL_STATE};

  onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log(user);
    this.setState({currentUser: user});
    this.setState({isLoading: false});
  };

  componentDidMount = () => {
    auth().onAuthStateChanged(this.onAuthStateChanged);
  };

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
export default AuthProvider;
