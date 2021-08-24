import React, { Component } from "react";
import MenuListItem from "../menu-list-item";
import { connect } from "react-redux";
import WithGurmanService from "../hoc/with-gurman-service";
import {
  menuLoaded,
  menuRequested,
  addedToCart,
  valueChanged,
} from "../../actions";
import Spinner from "../spinner";
import SearchPanel from "../search-panel";

import "./menu-list.scss";

class MenuList extends Component {
  componentDidMount() {
    const { menuRequested, GurmanService, menuLoaded } = this.props;
    menuRequested();
    GurmanService.getMenuItems().then((res) => menuLoaded(res));
  }
  componentDidUpdate(prevProps) {
    const { GurmanService, menuLoaded, searchValue } = this.props;
    if (prevProps.searchValue !== searchValue) {
      GurmanService.getMenuItems().then((res) => menuLoaded(res));
    }
  }
  render() {
    const { menuItems, loading, addedToCart, valueChanged } = this.props;
    if (loading) {
      return <Spinner />;
    }
    return (
      <>
        <h1 className="menu__big-title">The Gurman</h1>
        <SearchPanel
          className="menu__search"
          valueChangedHandler={valueChanged}
        />
        <h4 className="menu__premenu"> Our menu:</h4>
        <ul className="menu__list">
          {menuItems.length === 0 ? (
            <div className="cart__title">No items found :(</div>
          ) : (
            menuItems.map((menuItem) => {
              return (
                <MenuListItem
                  key={menuItem.id}
                  menuItem={menuItem}
                  addToCartHandler={() => addedToCart(menuItem.id)}
                />
              );
            })
          )}
        </ul>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    menuItems: state.menu,
    loading: state.loading,
    searchValue: state.searchValue,
  };
};

const mapDispatchToProps = {
  menuLoaded,
  menuRequested,
  addedToCart,
  valueChanged,
};

export default WithGurmanService()(
  connect(mapStateToProps, mapDispatchToProps)(MenuList)
);
