import React from "react";
import { connect } from "react-redux";
import { deleteFromCart } from "../../actions";
import WithGurmanService from "../hoc";
import "./cart-table.scss";

const CartTable = ({ items, deleteFromCart, GurmanService }) => {
  if (items.length === 0) {
    return <div className="cart__title">Your card is empty</div>;
  }
  return (
    <>
      <div className="cart__title">Your Cart:</div>
      <div className="cart__list">
        {items.map((item) => {
          const { title, url, price, id, quantity } = item;
          return (
            <div key={id} className="cart__item">
              <img src={url} className="cart__item-img" alt={title}></img>
              <div className="cart__item-title">{title}</div>
              <div className="cart__item-price">
                {price}$ x {quantity}
              </div>
              <div className="cart__close" onClick={() => deleteFromCart(id)}>
                &times;
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="order__btn"
        onClick={() => GurmanService.setOrder(generateOrder(items))}
      >
        Order
      </button>
    </>
  );
};

const generateOrder = (items) => {
  const newOrder = items.map((item) => {
    return {
      id: item.id,
      quantity: item.quantity,
    };
  });
  return newOrder;
};

const mapStateToProps = ({ items }) => {
  return {
    items,
  };
};

const mapDispatchToProps = {
  deleteFromCart,
};

export default WithGurmanService()(
  connect(mapStateToProps, mapDispatchToProps)(CartTable)
);
