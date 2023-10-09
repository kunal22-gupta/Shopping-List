import "./ShoppingListForm.css";
import { useState } from "react";

export default function ShoppingListForm({ setItemsList, uid }) {
    const [item, setItem] = useState({ id: uid.rnd(), product: "", qty: "" });
    const [isValidate, setIsValidate] = useState({product: true, qty: true})

    // Syncs the state with the user input
    const updateForm = (e) => {
        setItem((currItem) => {
            return { ...currItem, [e.target.name]: e.target.value };
        });
    };
    
    // When form is submitted
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check for validation and the state
        if(item.product === "") {
            setIsValidate(isValid => {
                return {...isValid, product: false}
            })
            return // return from here not executing the rest of function 
        } else {
            setIsValidate(isValid => {
                return {...isValid, product: true}
            })
        }
        if(item.qty === "" || item.qty < 1) {
            setIsValidate(isValid => {
                return {...isValid, qty: false}
            })
            return // return from here not executing the rest of function
        } else {
            setIsValidate(isValid => {
                return {...isValid, qty: true}
            })
        }


        // Executes the addItem function in parent component and add item in the itemsList
        setItemsList((currItemsList) => {
            return [...currItemsList, { ...item }];
        });
        // Reset the form
        setItem({ id: uid.rnd(), product: "", qty: "" });
    };
    return (
        <form onSubmit={handleSubmit} className="ShoppingListForm">
            <div className="row">
                <div className="col">
                    <label htmlFor="product">Product </label>
                    <input
                        type="text"
                        name="product"
                        id="product"
                        value={item.product}
                        onChange={updateForm}
                    />
                </div>
                <div className="col">
                    <label htmlFor="qty">Quantity </label>
                    <input
                        type="number"
                        name="qty"
                        id="qty"
                        value={item.qty}
                        onChange={updateForm}
                    />
                </div>
            </div>
            {!isValidate.product && <p className="mini-text warning">Provide a name to add</p>}
            {!isValidate.qty && <p className="mini-text warning">Quantity can't be less than 1</p>}
            <div className="row">
                <button>Add</button>
            </div>
        </form>
    );
}
