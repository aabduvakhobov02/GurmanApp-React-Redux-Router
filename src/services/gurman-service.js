export default class GurmanService {
  _apiBase = "https://gurman-app-default-rtdb.asia-southeast1.firebasedatabase.app";

  async getResource(url) {
    const response = await fetch(`${this._apiBase}${url}`);
    if (!response.ok) {
      throw new Error(
        `Server Error! Coundn't fetch ${url}, recieved ${response.status}`
      );
    }
    return await response.json();
  }

  async getMenuItems() {
    return await this.getResource("/menu.json");
  }

  async getItem(id) {
    const res = await this.getResource("/menu.json");
    console.log(res);
    const item = res.find((el) => {
      console.log(`el.id: ${el.id}, id: ${id}`);
      return el.id === +id;
    });
    return item;
  }

  async setOrder(order) {
    const number = await this.getOrderNumber();
    const newOrder = {
      id: number,
      order: order,
    };
    const response = await fetch(`${this._apiBase}/orders.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newOrder),
    });
    if (!response.ok) {
      throw new Error("json error");
    }
  }

  async getOrderNumber() {
    const res = await this.getResource("/orders.json");

    return res;
  }
}
