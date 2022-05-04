import React from 'react';
import { ReactAgenda , ReactAgendaCtrl , guid ,  Modal } from 'react-agenda';
import { Button } from "@react-md/button";
 
require('moment/locale/pt-br.js'); // this is important for traduction purpose
 
var colors= {
  'color-1':"rgba(102, 195, 131 , 1)" ,
  "color-2":"rgba(242, 177, 52, 1)" ,
  "color-3":"rgba(235, 85, 59, 1)"
}
 
var now = new Date();
 
var items = [
  {
   _id            :guid(),
    name          : 'Meeting , dev staff!',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
    classes       : 'color-1'
  },
  {
   _id            :guid(),
    name          : 'Working lunch , Holly',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 11, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 13, 0),
    classes       : 'color-2 color-3'
  },

  {
    _id            :guid(),
     name          : 'Teste 1',
     startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate(),13, 0),
     endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 0),
     classes       : 'color-2 color-3'
   },
 
];
 
export default class Agenda extends React.Component {
  constructor(props){
  super(props);
    this.state = {
      items:items,
      selected:[],
      cellHeight:30,
      showModal:false,
      locale:"pt-br",
      rowsPerHour:2,
      numberOfDays:4,
      startDate: new Date()
    }
    this.handleCellSelection = this.handleCellSelection.bind(this)
    this.handleItemEdit = this.handleItemEdit.bind(this)
    this.handleRangeSelection = this.handleRangeSelection.bind(this)
  }
 
handleCellSelection(item){
  console.log('handleCellSelection',item)
}
handleItemEdit(item){
  console.log('handleItemEdit', item)
}
handleRangeSelection(item){
  console.log('handleRangeSelection', item)
}
  render() {
    return (
      <div>
        <Button id="text-button-1" theme="primary">
        Text Button 1
      </Button>
        <ReactAgenda
          minDate={now}
          maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
          disablePrevButton={false}
          startDate={this.state.startDate}
          cellHeight={this.state.cellHeight}
          locale={this.state.locale}
          items={this.state.items}
          numberOfDays={this.state.numberOfDays}
          rowsPerHour={this.state.rowsPerHour}
          itemColors={colors}
          autoScale={false}
          fixedHeader={true}
          onItemEdit={this.handleItemEdit.bind(this)}
          onCellSelect={this.handleCellSelection.bind(this)}
          onRangeSelection={this.handleRangeSelection.bind(this)}/>
      </div>
    );
  }
}