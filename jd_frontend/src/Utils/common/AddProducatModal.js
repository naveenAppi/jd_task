import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import TextInput from '../common/TextInput';
import isEmpty from '../validation/isEmpty';
import { AddProduct } from '../../Actions/productActions';
import {connect } from 'react-redux';

export class AddProducatModal extends Component {
  state = {
       productname:{name:"productname" ,placeholder:"Product Name", label:"Product Name", value:"" , isRequired:true, hasEror:false, errorMessage:"" },
       price:{name:"price" ,placeholder:"Price", label:"Price", value:"" , isRequired:true, hasEror:false, errorMessage:"" },
       unitOfMeasurement: { name: "unitOfMeasurement", placeholder: "Unit Of Measurement", label: "Unit Of Measurement", value: "", isRequired: true, hasEror: false, errorMessage: "" },
       description: { name: "description", placeholder: "Description", label: "Description", value: "", isRequired: true, hasEror: false, errorMessage: "" },
       imagePath:{ name: "imagePath", placeholder: "Upload Image",file:null , label: "Upload Image", value: "", isRequired: true, hasEror: false, errorMessage: "" },
       show: false,
       productId:null
  }
  handleClose = () => {
    this.setState({
      show:false
     })
   };
  handleShow = () => {
    this.setState({
      show:true
     })
  };

  handleValidation = () => {
    let formValid = true;
    let fields = ["imagePath", "productname", "price", "description", "unitOfMeasurement"];

    fields.forEach((ele, index) => {
      let fieldName = this.state[ele];
      if (isEmpty(fieldName.value)) {
        fieldName.hasEror = true;
        fieldName.errorMessage = `${fieldName.label} is Required`;
        formValid = false
        this.setState({ fieldName})
         }
    })
    
    return formValid;
  }
  
  onSubmitHandler = (e) => {
    e.preventDefault();
    let { imagePath, productname, price, description, unitOfMeasurement, productId } = this.state;
    if (this.handleValidation()) {
      const formData = new FormData();
      formData.append('imagePath', imagePath.file);
      formData.append('productname', productname.value);
      formData.append('price', price.value);
      formData.append('description', description.value);
      formData.append('unitOfMeasurement', unitOfMeasurement.value);

      if (productId !== null) {
        formData.append('id', productId);
      }

      this.props.AddProduct(formData);
      this.handleClose();
    }
    
  }

  onChangeHandler = (e) => {

    let fieldName = e.target.name;
    let field = this.state[fieldName];

    if (fieldName === "imagePath") {
      field.value = e.target.files[0].name
      field.file = e.target.files[0]
    } else {
      field.value = e.target.value
    }
    field.hasEror = false
    field.errorMessage = ""

    this.setState({
      fieldName:field
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showModal === true) {
      let data = nextProps.productObj;
      this.handleShow();
      this.populateData(data);
    }
  }

  populateData = (data) => {
    let { imagePath, productname, price, description, unitOfMeasurement, productId } = this.state;
    imagePath.value = !isEmpty(data.imagePath) ? data.imagePath : '';
    productname.value = !isEmpty(data.productname) ? data.productname : '';
    price.value = !isEmpty(data.price) ? data.price : '';
    description.value = !isEmpty(data.description) ? data.description : '';
    unitOfMeasurement.value = !isEmpty(data.unitOfMeasurement) ? data.unitOfMeasurement : '';
    productId = !isEmpty(data._id) ? data._id : null;
    this.setState({ imagePath, productname, price, description, unitOfMeasurement, productId })
  }

  resetFields = () => {
    let fields = ["imagePath", "productname", "price", "description", "unitOfMeasurement"];

    fields.forEach((ele, index) => {
      let fieldName = this.state[ele];
      fieldName.value = ""
      fieldName.hasEror = true;
      fieldName.errorMessage = "";
      this.setState({ fieldName })
    });
    this.setState({ productId: null });
  }


  render() {

      let {productId} = this.state

    return (
      <div>
        <Button className="addButton" onClick={() => {
          this.resetFields();
          this.handleShow();
      }}>
      Add Product
    </Button>

    <Modal show={this.state.show} onHide={this.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> {productId !== null ? "Edit Product" : "Add Product" }  </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form>
             <TextInput
            type="text"
            name={this.state.productname.name}
            placeholder={this.state.productname.placeholder}
            label={this.state.productname.label}
            value={this.state.productname.value}
            onChange={this.onChangeHandler}  
            hasEror={this.state.productname.hasEror}    
            error={this.state.productname.errorMessage}
          />
            <TextInput
            type="text"
            name={this.state.price.name}
            placeholder={this.state.price.placeholder}
            label={this.state.price.label}
            value={this.state.price.value}
            onChange={this.onChangeHandler}  
            hasEror={this.state.price.hasEror}    
            error={this.state.price.errorMessage}
          />
              <TextInput
            type="text"
            name={this.state.unitOfMeasurement.name}
            placeholder={this.state.unitOfMeasurement.placeholder}
            label={this.state.unitOfMeasurement.label}
            value={this.state.unitOfMeasurement.value}
            onChange={this.onChangeHandler}  
            hasEror={this.state.unitOfMeasurement.hasEror}    
            error={this.state.unitOfMeasurement.errorMessage}
          />
              <TextInput
            type="text"
            name={this.state.description.name}
            placeholder={this.state.description.placeholder}
            label={this.state.description.label}
            value={this.state.description.value}
            onChange={this.onChangeHandler}  
            hasEror={this.state.description.hasEror}    
            error={this.state.description.errorMessage}
          />

          <div className='custom-file mb-4'>
         <input
            name="imagePath"
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={this.onChangeHandler}  
          />
          <label className='custom-file-label' htmlFor='customFile'>
          {this.state.imagePath.value}
          </label>
              </div>
              {this.state.imagePath.hasEror === true ? <small style={{ color: "red" }} class="form-text">{this.state.imagePath.errorMessage}</small> : null}


              {productId !== null ?
                <img className="img-fluid" 
            src={`${process.env.PUBLIC_URL}/assets/images/${this.state.imagePath.value}`} 
                  alt="logo" style={{ width: "100px", height: "100px" }} />
                : null}
            </form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="addButton"  onClick={this.handleClose}>
          Close
        </Button>
        <Button className="addButton" onClick={this.onSubmitHandler}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  
})

export default connect(mapStateToProps , {AddProduct}) (AddProducatModal);