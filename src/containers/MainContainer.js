import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  constructor(){
    super()
    this.state = {
      stocks: [],
      myPortfolio: [],
      filter: 'All',
      sort: 'None'
    }
  }

componentDidMount(){
  fetch('http://localhost:3000/stocks')
  .then(resp => resp.json())
  .then(data => this.setState({stocks: data}))
}

handleAdd = (stock) => {
// let addingStock = 
// console.log(addingStock)
if(this.state.stocks.find(stockID => stockID === stock.id)) {
  alert("You already have this Stock")
} else {
  this.setState({
  myPortfolio: [...this.state.myPortfolio, stock]
  
})
}

}

handleSell = (stock) => {
console.log("click", stock.name)
let newPort = this.state.myPortfolio.filter(port => port !== stock);
this.setState({
  myPortfolio: newPort
})
}

handleSort = (event) =>  {
  this.setState({ sort: event.target.value})
}

handleFilter = (event) => {
  this.setState({ filter: event.target.value })
}

calculateDisplayStocks = () => {
  let filteredStocks = [...this.state.stocks]
  if(this.state.filter !== "All"){
    filteredStocks =  filteredStocks.filter(stock => stock.type === this.state.filter)        
  } 

  switch(this.state.sort){
    case "Alphabetically":
      return filteredStocks.sort((a,b) => a.name > b.name ? 1 : -1)
    case "Price":
        return filteredStocks.sort((a,b) => a.price > b.price ? 1 : -1)
    default:
      return filteredStocks
  }
}


  render() {

    let stocks = this.calculateDisplayStocks()
    return (
      <div>
        <SearchBar  handleFilter={this.handleFilter} handleSort={this.handleSort} sort={this.state.sort}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={stocks} handleAdd={this.handleAdd}/>

            </div>
            <div className="col-4">

              <PortfolioContainer myPortfolio={this.state.myPortfolio} handleSell={this.handleSell}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
