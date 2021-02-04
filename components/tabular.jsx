import React, { Component } from "react";

class Tabular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reverse: false,
      data: [],
      sortBy: "",
      message: "",
      limit: 10,
      loading: false,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({ loading: true });
    fetch("/api/data" + `?limit=${this.state.limit}`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ data: response });
      })
      .catch((err) => {
        this.setState({ message: "Failed loading the resource" });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  setSortBy = (event) => {
    const sortBy = event.target.name;

    if (this.state.sortBy === sortBy) {
      this.setState({ reverse: !this.state.reverse });
    } else {
      this.setState({ sortBy });
    }
  };

  setLimitHandler = (limit) => {
    this.setState({ limit }, () => {
      this.loadData();
    });
  };

  static sortHandler(x, y) {
    if (!x || !y) {
      return 0;
    } else if (!isNaN(x) && !isNaN(y)) {
      return x - y;
    } else if (typeof x === "string" && typeof y === "string") {
      return x.localeCompare(y);
    } else {
      return 0;
    }
  }

  render() {
    const { data, message, sortBy: sortKey, reverse, loading } = this.state;

    if (loading) {
      return <h3>Loading ...</h3>;
    }

    return (
      <div className="container">
        {message ? (
          <div class="alert alert-danger">{message}</div>
        ) : (
          <>
            <div className="pull-right" style={{ marginBottom: "2rem" }}>
              <div class="dropdown">
                <button
                  class="btn btn-primary dropdown-toggle"
                  type="button"
                  data-toggle="dropdown"
                >
                  Set Limit
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a href="#" onClick={() => this.setLimitHandler(10)}>
                      10
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={() => this.setLimitHandler(20)}>
                      20
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={() => this.setLimitHandler(50)}>
                      50
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>
                    <a onClick={this.setSortBy} name="store">
                      Store
                    </a>
                  </th>
                  <th>
                    <a onClick={this.setSortBy} name="name">
                      Name
                    </a>
                  </th>
                  <th>
                    <a onClick={this.setSortBy} name="initialPrice">
                      Initial Price
                    </a>
                  </th>
                  <th>
                    <a onClick={this.setSortBy} name="discountPrice">
                      Discount Price
                    </a>
                  </th>
                  <th>
                    <a onClick={this.setSortBy} name="discountAmount">
                      Discount Amount
                    </a>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data
                  .sort((x, y) => {
                    if (reverse) {
                      return Tabular.sortHandler(x[sortKey], y[sortKey]);
                    } else {
                      return Tabular.sortHandler(y[sortKey], x[sortKey]);
                    }
                  })
                  .map((x) => (
                    <tr key={Math.random()}>
                      <td>{x.store}</td>
                      <td>{x.name}</td>
                      <td>{x.initialPrice}</td>
                      <td>{x.discountPrice}</td>
                      <td>{x.discountAmount}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    );
  }
}

export default Tabular;
