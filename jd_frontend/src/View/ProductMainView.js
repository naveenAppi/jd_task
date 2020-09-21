import React, { Component } from 'react';
import AddProducatModal from '../Utils/common/AddProducatModal';
import { getAllProduct } from '../Actions/productActions';
import { connect } from 'react-redux';
import isEmpty from '../Utils/validation/isEmpty';

export class ProductMainView extends Component {

  state = {
    products: [],
    pagination: { totalPage: 0, page: 0, limit: 0 },
    productObj:{},
    editmode:false
  }

  componentDidMount() {
    let page = 1;
    let limit = 10;
    this.props.getAllProduct(page , limit);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.product.product)) {
      let productData = nextProps.product.product.docs;
      let pagination = {}
      pagination.totalPage = nextProps.product.product.total
      pagination.page = nextProps.product.product.page
      pagination.limit = nextProps.product.product.limit
      this.setState({
        products:productData,pagination
      })

    }
 
  }

  showModalForEdit = (data, index) => {
    this.setState({
      editmode: true,
      productObj:data
    });
  }

  render() {

    let {products} = this.state
    let productListView;

    productListView = !isEmpty(products) ? products.map((data, index) => {
         return  <tr key = {index}>
           <td><img
           src={`${process.env.PUBLIC_URL}/assets/images/${data.imagePath}`} 
             alt="Nature" class="responsive" /></td>
           <td>{data.productname}</td>
           <td>{data.description}</td>
           <td>{data.price}</td>
           <td>{data.unitOfMeasurement}</td>
           <td><button className="editButton" onClick={() => {
             this.showModalForEdit(data, index);
         }} >Edit</button> 
               <button className="deleteButton">Delete</button> </td>
       </tr>
    }) : null;

        return <React.Fragment>
        <div className="container">
                <div className="row justify-content-md-center mt-4">  
                <div className="col align-self-center">
                        <div className="header">
                            <div className="row">
                            <div className="col-9 mt-2">
                            <div className="title"> 
                            <h3>View Product</h3>
                            </div>
                                        </div>
                                        
                            <div className="col-3 mt-2">
                            <div className="addProduct_button">
                        <AddProducatModal showModal={this.state.editmode}
                          productObj = {this.state.productObj}
                        />
                                </div>
                            </div>
                            </div>          
                            </div>    
                    </div>
                    



                </div>
                
                 <div className="row justify-content-md-center">
                    <div className="col align-self-center">
                <div className="card_body">
                  <div className="table_section">
                  <table className="table table-responsive table-striped table-hover align-self-center">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Name</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Unit Of Measurement</th>
                      <th>Edit/Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                 {productListView}
                  </tbody>
                </table>
                  </div>
                   
               
                           
                            <nav aria-label="Page navigation">
                            <ul class="pagination">
                              <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                              <li class="page-item"><a class="page-link" href="#">1</a></li>
                              <li class="page-item"><a class="page-link" href="#">2</a></li>
                              <li class="page-item"><a class="page-link" href="#">3</a></li>
                              <li class="page-item"><a class="page-link" href="#">Next</a></li>
                            </ul>
                          </nav>
                        
               
                        </div>  
                    </div>
                    
                    
                </div>
                

                </div>
        </React.Fragment>
    }
}

const mapStateToProps = state => ({
  product:state.product
})

export default connect(mapStateToProps , {getAllProduct}) (ProductMainView);
