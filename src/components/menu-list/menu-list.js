import React, { Component } from "react";
import MenuListItem from "../menu-list-item";
import { connect } from "react-redux";
import WithGurmanService from "../hoc/with-gurman-service";
import { menuLoaded, menuRequested, addedToCart } from "../../actions";
import Spinner from "../spinner";

import "./menu-list.scss";

class MenuList extends Component {
  componentDidMount() {
    const { menuRequested, GurmanService, menuLoaded } = this.props;
    menuRequested();
    GurmanService.getMenuItems().then((res) => menuLoaded(res));
  }
  render() {
    const { menuItems, loading, addedToCart } = this.props;
    if (loading) {
      return <Spinner />;
    }
    return (
      <ul className="menu__list">
        {menuItems.map((menuItem) => {
          return (
            <MenuListItem
              key={menuItem.id}
              menuItem={menuItem}
              addToCartHandler={() => addedToCart(menuItem.id)}
            />
          );
        })}
      </ul>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    menuItems: state.menu,
    loading: state.loading,
  };
};

const mapDispatchToProps = {
  menuLoaded,
  menuRequested,
  addedToCart,
};

export default WithGurmanService()(
  connect(mapStateToProps, mapDispatchToProps)(MenuList)
);
