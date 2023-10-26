// Import NPM Modules
import React, {useEffect, useState} from "react";
import axios from 'axios';
console.log("NewTransaction.jsx= => NPM modules imported");

function NewTransaction() {
  console.log("NewTransaction.jsx= => NewTransaction - function call");

  const initialValues = {account_id: "", amount: ""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const accountIDRegExp = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}$/;
  const amountRegExp = /^-{0,1}\d{1,}\.?\d{0,2}$/;
  console.log("NewTransaction.jsx= => NewTransaction => Default state assigned");

  // Validate the form field while change
  const handleChange = (e) => {
    console.log("NewTransaction.jsx= => NewTransaction => handleChange - function call");
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name] : value });
    console.log("NewTransaction.jsx= => NewTransaction => Form Values: ", formValues);
  };

  // Perform action on submit click
  const handleSubmit = (e) => {
    console.log("NewTransaction.jsx= => NewTransaction => handleSubmit - function call");

    // Validate the form post submit
    setFormErrors(validate(formValues));
    if(!(Object.keys(formErrors).length === 0)){
      console.log("NewTransaction.jsx= => NewTransaction => handleSubmit => Validation Failed Post Submit Clicked.");
      setIsSubmit(false);
      return;
    }
    
    if(! accountIDRegExp.test(formValues.account_id)){
      console.log("NewTransaction.jsx= => NewTransaction => Invalid Account Id: ", formValues.account_id);
      return;
    }

    if(! amountRegExp.test(formValues.amount)){
      console.log("NewTransaction.jsx= => NewTransaction => Invalid Amount: ", formValues.amount);
      return;
    }

    setIsSubmit(true);
    console.log("NewTransaction.jsx= => NewTransaction => handleSubmit => Validation Success Post Submit Clicked.");
    
    console.log("NewTransaction.jsx= => NewTransaction => handleSubmit => Account Id is ", formValues.account_id);
    console.log("NewTransaction.jsx= => NewTransaction => handleSubmit => Amount is ", formValues.amount);

    // Post the transaction request
    axios.post('http://localhost:5000/transactions', {
      "account_id" : formValues.account_id,
      "amount": formValues.amount,
    })
    .then((res) => {
      // Response is the transaction
      console.log("NewTransaction.jsx= => NewTransaction => POST http://localhost:5000/transactions : ", res.data);
    })
    .catch(err => console.error(err));
  };

  useEffect(() => {
    console.log("NewTransaction.jsx= => NewTransaction => useEffect - function call");
    console.log("NewTransaction.jsx= => NewTransaction => Form Values: ", formValues);
    if(Object.keys(formErrors).length > 0 || !isSubmit){
      console.log("NewTransaction.jsx= => NewTransaction => Form Errors: ", formErrors);
    }
  },[formErrors, formValues, isSubmit])

  const validate = (values) => {
    console.log("NewTransaction.jsx= => NewTransaction => validate - function call");
    const errors = {};
    if (! values.account_id){
      console.log("NewTransaction.jsx= => NewTransaction => Account ID is required!");
      errors.account_id = "Account ID is required!";
    }
    else if(! accountIDRegExp.test(values.account_id)){
      console.log("NewTransaction.jsx= => NewTransaction => Invalid Account Id: ", values.account_id);
      errors.account_id = "Account ID is invalid!!";
    }

    if (! values.amount){
      console.log("NewTransaction.jsx= => NewTransaction => Amount is required!");
      errors.amount = "Amount is required!";
    }
    return errors;
  };

  return (
    <div>
      { /*
        Object.keys(formErrors).length === 0 && isSubmit ? 
        (<div className="ui message success border rounded p-1 mb-2 bg-success text-white text-center">Transaction Submitted Successfully</div>) : 
        (<pre>{JSON.stringify(formValues, undefined, 2)}</pre>)*/
      }
      
      <form className="border rounded mt-3 p-3" data-testid="new-transaction-form" onSubmit={handleSubmit}>
        <div className="form-group m-1">
          <label data-testid="label-account-id">Account ID:</label>
          <input data-testid="input-account-id" type="text" data-type="account-id" className="form-control" placeholder="Enter Account ID" name="account_id" value={formValues.account_id} onChange={handleChange} />
          <p className="text-danger">{formErrors.account_id}</p>
        </div>
        <div className="form-group m-1">
          <label data-testid="label-amount">Amount:</label>
          <input type="number" data-type="amount" className="form-control" placeholder="Enter Amount" name="amount" value={formValues.amount} onChange={handleChange} />
          <p className="text-danger">{formErrors.amount}</p>
        </div>
        <div className='d-flex justify-content-center mt-3'>
          <button type="submit" data-type="transaction-submit" className="btn btn-outline-primary">Submit</button>
        </div>
      </form>
    </div>
       
  );
}

export default NewTransaction;


