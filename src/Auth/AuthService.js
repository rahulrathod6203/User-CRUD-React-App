class AuthService {
  registerSuccessfullLogin(username, password) {
    console.log("registerSuccessfullLogin");
    sessionStorage.setItem("authenticatedUser", username);
  }
  logout() {
    sessionStorage.removeItem("authenticatedUser");
  }

  loggedInUser() {
    let name = sessionStorage.getItem("authenticatedUser");
    return name;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("authenticatedUser");
    if (user === null) {
      return false;
    } else {
      return true;
    }
  }
}
export default new AuthService();
