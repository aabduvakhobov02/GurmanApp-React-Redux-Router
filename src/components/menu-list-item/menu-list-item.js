import React from "react";
import { Link } from "react-router-dom";
import "./menu-list-item.scss";

const MenuListItem = ({ menuItem, addToCartHandler }) => {
  const { title, price, url, category, id } = menuItem;
  return (
    <li className="menu__item">
      <Link to={`/${id}`} className="menu__link">
        <div className="menu__title">{title}</div>
        <img className="menu__img" src={url} alt={title}></img>
        <div className="menu__category">
          Category: <span>{category}</span>
        </div>
        <div className="menu__price">
          Price: <span>{price}$</span>
        </div>
        <button
          className="menu__btn"
          onClick={(e) => {
            e.preventDefault();
            addToCartHandler();
          }}
        >
          Add to cart
        </button>
      </Link>
    </li>
  );
};

export default MenuListItem;
