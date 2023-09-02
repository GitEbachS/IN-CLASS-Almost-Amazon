/* eslint-disable no-alert */
import { getAuthors, getSingleAuthor } from '../api/authorData';
import { deleteBook, getBooks, getSingleBook } from '../api/bookData';
import { showBooks } from '../pages/books';
import addBookForm from '../components/forms/addBookForm';
import addAuthorForm from '../components/forms/addAuthorForm';
import viewAuthor from '../pages/viewAuthor';
import viewBook from '../pages/viewBook';
import { deleteAuthorBooksRelationship, getAuthorDetails, getBookDetails } from '../api/mergedData';
import { emptyAuthors, showAuthors } from '../pages/authors';
import { getSingleOrder, updateOrderBook, createOrderBook } from '../api/orderData';

const domEvents = (user) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    if (e.target.id.includes('delete-book')) {
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteBook(firebaseKey).then(getBooks).then(showBooks);
      }
    }

    // TODO: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      addBookForm(user.uid);
    }

    // TODO: CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleBook(firebaseKey).then((bookObj) => addBookForm(user.uid, bookObj));
    }
    // TODO: CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getBookDetails(firebaseKey).then(viewBook);
    }
    if (e.target.id.includes('view-author-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getAuthorDetails(firebaseKey).then(viewAuthor);
    }
    // FIXME: ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteAuthorBooksRelationship(firebaseKey).then(() => {
          getAuthors(user.uid).then((array) => {
            if (array.length) {
              showAuthors(array);
            } else {
              emptyAuthors();
            }
          });
        });
      }
    }

    if (e.target.id.includes('order-btn')) {
      const [, firebaseKey] = e.target.id.split('--');

      getSingleOrder(user.uid).then((orderObj) => {
        const payload = {
          orderId: orderObj.name,
          bookId: firebaseKey,
        };
        createOrderBook(payload).then(({ name }) => {
          const patchPayload = { firebaseKey: name };
          updateOrderBook(patchPayload);
        });
      });
    }
    // FIXME: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm(user.uid);
    }
    if (e.target.id.includes('update-author-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleAuthor(firebaseKey).then((authObj) => addAuthorForm(user.uid, authObj));
    }
    // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR
  });
};

export default domEvents;
