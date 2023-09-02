import { getBooks } from '../api/bookData';
import createOrderButton from '../components/buttons/createOrderButton';
import logoutButton from '../components/buttons/logoutButton';
import domBuilder from '../components/shared/domBuilder';
import navBar from '../components/shared/navBar';
import domEvents from '../events/domEvents';
import formEvents from '../events/formEvents';
import navigationEvents from '../events/navigationEvents';
import { showBooks, emptyBooks } from '../pages/books';

const startApp = (user) => {
  domBuilder(); // BUILD THE DOM
  domEvents(user); // ADD THE EVENT LISTENTERS TO THE DOM
  formEvents(user); // ADD FORM EVENT LISTENTERS TO THE DOM
  navBar(); // DYNAMICALLY ADD THE NAV
  logoutButton(); // ADD THE LOGOUT BUTTON COMPONENT
  createOrderButton();
  navigationEvents(user); // ATTACH THE EVENT LISTENERS TO THE NAVBAR
  getBooks(user.uid).then((array) => {
    if (array.length) {
      showBooks(array);
    } else {
      emptyBooks();
    }
  });
};

export default startApp;
