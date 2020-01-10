import React, { Component } from 'react';
//import logo from './logo.svg';
import Title from './components/Title.js';
import Search from './components/Search.js';
import Sort from './components/Sort.js';
import Form from './components/Form.js';
import ListItem from './components/ListItem.js';
import Item from './components/Item.js';
import ItemEdit from './components/ItemEdit.js';
import Items from './mockdata/Items.js';
import SweetAlert from 'sweetalert-react';
import './../node_modules/sweetalert/dist/sweetalert.css';
//import './App.css';
import uuidv4 from 'uuid/v4';
import { orderBy as orderByld } from 'lodash';

class App extends Component {
  constructor(props){
    super(props);

    let arrayLevel = [];

    if (Items.length > 0) {
      for (var i = 0; i < Items.length; i++) {
        if (arrayLevel.indexOf(Items[i].level) === -1) {
          arrayLevel.push(Items[i].level);
        }
      }
      arrayLevel.sort(function(a, b) {return (a - b)});
    }

    this.state = {
      items: Items,
      showAlert: false,
      arrayLevel: arrayLevel,
      titleAlert: '',
      idAlert: '',
      textAlert: '',
      indexEdit: '',
      idEdit: '',
      nameEdit: '',
      levelEdit: '',
      showForm: false,
      valueItem: '',
      levelItem: 1,
      sortType: 'name',
      sortOrder: 'asc',
      nameSearch: '',
      resultSearch: [],
    }
  };

  renderItem = () => {
    const {indexEdit, idEdit, nameEdit, levelEdit, arrayLevel} = this.state;
    let {items, nameSearch} = this.state;

    if (nameSearch !== '') {
      items = this.state.resultSearch; 
    }

    if (items.length === 0) {
      return <Item item={0}/>
    }

    return items.map((item, index) => {
      if (item.id === idEdit) {
        return (
          <ItemEdit 
            key={item.id}
            indexEdit={indexEdit}
            idEdit={idEdit}
            nameEdit={nameEdit}
            levelEdit={levelEdit}
            arrayLevel={arrayLevel}
            handleEditItemCancel={this.handleEditItemCancel}
            handleEditInputChange={this.handleEditInputChange}
            handleEditSelectChange={this.handleEditSelectChange}
            handleEditClickSubmit={this.handleEditClickSubmit}
          />
        );
      }

      return (
        <Item
          key={item.id}
          item={item}
          index={index}
          handleShowAlert={this.handleShowAlert}
          handleEditItem={this.handleEditItem}
        />
      )
    });
  };

  handleShowAlert = (item) => {
    this.setState({
      showAlert: true,
      titleAlert: 'Xóa item này?',
      textAlert: item.name,
      idAlert: item.id,
    })
  }

  handleDeleteItem = () => {
    let {idAlert, items, nameSearch} = this.state;

    if (items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === idAlert) {
          items.splice(i, 1);
          break;
        }
      }
    }

    this.handleChangeNameSearch(nameSearch);

    this.setState({
      showAlert: false
    })
  }

  handleEditItemCancel = () => {
    this.setState({
      indexEdit: '',
      idEdit: '',
      nameEdit: '',
      levelEdit: 0,
    })
  }

  handleEditItem = (index, item) => {
    this.setState({
      indexEdit: index,
      idEdit: item.id,
      nameEdit: item.name,
      levelEdit: item.level,
    })
  }

  handleEditInputChange = (name) => {
    this.setState({
      nameEdit: name,
    })
  }

  handleEditSelectChange = (level) => {
    this.setState({
      levelEdit: level,
    })
  }

  handleEditClickSubmit = () => {
    let {items, idEdit, nameEdit, levelEdit, nameSearch} = this.state;

    if (nameEdit === '') {
      this.setState({
        showAlert: true,
        titleAlert: 'Warning',
        textAlert: 'Name is empty!',
      })
      return false;
    }

    if (items.length > 0) {
      for (var i = 0; i < items.length; i++) {
        if (items[i].id === idEdit) {
          items[i].name = nameEdit;
          items[i].level = Number(levelEdit);
          break;
        }
      }

      this.setState({
        items: orderByld(items, [this.state.sortType], [this.state.sortOrder]),
      })
    }

    this.handleChangeNameSearch(nameSearch);

    this.handleEditItemCancel();
  }

  handleShowForm = () => {
    this.setState({
      showForm: !this.state.showForm,
    })
  }

  handleFormInputChange = (value) => {
    this.setState({
      valueItem: value,
    })
  }

  handleFormSelectChange = (level) => {

    this.setState({
      levelItem: Number(level),
    })
  }

  handleFormCancelClick = () => {
    this.setState({
      showForm: false,
      valueItem: '',
      levelItem: 1,
    })
  }

  handleFormSubmitClick = () => {
    let {valueItem, levelItem, nameSearch} = this.state;

    if (valueItem.trim() === 0) {
      return false;
    }

    let newItem = {
      id: uuidv4(),
      name: valueItem,
      level: levelItem,
    }

    Items.push(newItem);

    this.setState({
      items: orderByld(Items, [this.state.sortType], [this.state.sortOrder]),
      showForm: false,
      valueItem: '',
      levelItem: 1,
    })

    this.handleChangeNameSearch(nameSearch);

  }

  handleChangeFieldSort = (field) => {
    this.setState({
      sortType: field,
    })

    let {items, sortOrder, resultSearch} = this.state;

    this.setState({
      items: orderByld(items, [field], [sortOrder]),
      resultSearch: orderByld(resultSearch, [field], [sortOrder]),
    })
  }

  handleChangeTypeSort = (type) => {
    this.setState({
      sortOrder: type,
    })

    let {items, sortType, resultSearch} = this.state;

    this.setState({
      items: orderByld(items, [sortType], [type]),
      resultSearch: orderByld(resultSearch, [sortType], [type]),
    })
  }

  handleChangeNameSearch = (nameSearch) => {
    this.setState({
      nameSearch: nameSearch,
    })

    let {items, resultSearch} = this.state;

    resultSearch = items.filter(function(item) {
      return item.name.match(nameSearch);
    });

    this.setState({
      resultSearch: resultSearch,
    })
  }

  handleClearNameSearch = () => {
    this.setState({
      nameSearch: '',
    })
  }

  render() {
    return (
      <div className="container">
        <SweetAlert
          show={this.state.showAlert}
          title={this.state.titleAlert}
          text={this.state.textAlert}
          showCancelButton
          onOutsideClick={() => this.setState({showAlert: false})}
          onEscapeKey={() => this.setState({showAlert: false})}
          onCancel={() => this.setState({showAlert: false})}
          onConfirm={() => this.handleDeleteItem()}
        />
        <Title />
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <Search 
              nameSearch={this.state.nameSearch}
              handleChangeNameSearch={this.handleChangeNameSearch}
              handleClearNameSearch={this.handleClearNameSearch}
            />
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <Sort
              sortType={this.state.sortType}
              sortOrder={this.state.sortOrder}
              handleChangeFieldSort={this.handleChangeFieldSort}
              handleChangeTypeSort={this.handleChangeTypeSort}
            />
          </div>
          <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
            <button 
              type="button" className="btn btn-info btn-block marginB10"
              onClick={this.handleShowForm}
            >{(this.state.showForm) ? 'Close' : 'Add Item'}</button>
          </div>
        </div>
        <div className="row marginB10">
          <div className="col-md-offset-7 col-md-5">
            <Form 
              showForm={this.state.showForm}
              arrayLevel={this.state.arrayLevel}
              valueItem={this.state.valueItem}
              handleFormInputChange={this.handleFormInputChange}
              levelItem={this.state.levelItem}
              handleFormSelectChange={this.handleFormSelectChange}
              handleFormCancelClick={this.handleFormCancelClick}
              handleFormSubmitClick={this.handleFormSubmitClick}
            />
          </div>
        </div>
        <ListItem 
          listRenderItem={this.renderItem}
          />
      </div>
    );
  };

}

export default App;
