import React, { Component } from "react";
import MenuListItem from "../menu-list-item";
import { connect } from "react-redux";
import WithGurmanService from "../hoc/with-gurman-service";
import { menuSearched, menuRequested, addedToCart } from "../../actions";
import Spinner from "../spinner";
import SearchPanel from "../search-panel";

import "./menu-list.scss";

class MenuList extends Component {
  componentDidMount() {
    const { menuRequested, GurmanService, menuSearched } = this.props;
    menuRequested();
    GurmanService.getMenuItems().then((res) => menuSearched(res));
  }
  render() {
    const { menuItems, loading, addedToCart } = this.props;
    if (loading) {
      return <Spinner />;
    }
    return (
      <>
        <h1 className="menu__big-title">The Gurman</h1>
        <SearchPanel className="menu__search" />
        <h4 className="menu__premenu"> Our menu:</h4>
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
      </>
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
  menuSearched,
  menuRequested,
  addedToCart,
};

export default WithGurmanService()(
  connect(mapStateToProps, mapDispatchToProps)(MenuList)
);
