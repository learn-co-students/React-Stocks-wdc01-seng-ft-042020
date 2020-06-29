import React from 'react'

const Stock = (props) => (
  <div >

    <div  className="card">
      <div  className="card-body">
        <h5 onClick={() => props.handleClick(props.stock)} name={props.stock.name} className="card-title">{
            //Company Name
            props.stock.name
          }</h5>
        <p className="card-text">{
            `${props.stock.ticker}: ${props.stock.price}`
          }</p>
      </div>
    </div>


  </div>
);

export default Stock
