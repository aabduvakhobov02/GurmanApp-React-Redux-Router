import { number } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { deleteFromCart } from "../../actions";
import "./cart-table.scss";

const CartTable = ({ items, deleteFromCart }) => {
  if (items.length === 0) {
    return <div className="cart__title">Your card is empty</div>;
  }
  return (
    <>
      <div className="cart__title">Your Cart:</div>
      <div className="cart__list">
        {items.map((item) => {
          const { title, url, price, id } = item;
          return (
            <div key={id} className="cart__item">
              <img src={url} className="cart__item-img" alt={title}></img>
              <div className="cart__item-title">{title}</div>
              <div className="cart__item-price">
                {price}$ x {number}
              </div>
              <div className="cart__close" onClick={() => deleteFromCart(id)}>
                &times;
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

const mapStateToProps = ({ items }) => {
  return {
    items,
  };
};

const mapDispatchToProps = {
  deleteFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartTable);
