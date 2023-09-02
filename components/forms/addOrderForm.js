import clearDom from '../../utils/clearDom';
import renderToDOM from '../../utils/renderToDom';

const addOrderForm = (user) => {
  clearDom();
  const domString = `
    <form id="order-form--${user.uid}" class="mb-4">
      <div class="form-group">
        <label for="image">First Name</label>
        <input type="text" class="form-control" id="first_name" placeholder="First Name" value="" required>
      </div>
      <div class="form-group">
        <label for="image">Last Name</label>
        <input type="text" class="form-control" id="last_name" placeholder="Last Name" value="" required>
      </div>
      <div class="form-group">
        <label for="title">Email</label>
        <input type="email" class="form-control" id="email" aria-describedby="Email" placeholder="Enter Email" value="" required>
      </div>
      <select class="form-select" id="order-type" aria-label="Default select example">
        <option selected>Open this select menu</option>
        <option value="online">online</option>
        <option value="in-person">in-person</option>
      </select>
      <button type="submit" id="order-submit" class="btn btn-primary mt-3">Create Order</button>
    </form>`;

  renderToDOM('#form-container', domString);
};

export default addOrderForm;
