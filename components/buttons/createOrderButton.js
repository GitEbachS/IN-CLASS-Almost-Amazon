import addOrderForm from '../forms/addOrderForm';

const createOrderButton = () => {
  const domString = '<button id="create-order" class="btn btn-success">Create Order</button>';
  document.querySelector('#cart-button').innerHTML = (domString);
  document.querySelector('#create-order').addEventListener('click', addOrderForm);
};

export default createOrderButton;
