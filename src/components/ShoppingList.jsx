import "../../css/ShoppingList.css";

import ShortUniqueId from "short-unique-id";
import ShoppingListForm from "./ShoppingListForm";
import { useEffect, useState } from "react";

const uid = new ShortUniqueId();

const initialList = JSON.parse(localStorage.getItem("itemsList")) || [
    { id: uid.rnd(), product: "Apples", qty: 5 },
    { id: uid.rnd(), product: "Bananas", qty: 4 },
];

export default function ShoppingList() {
    const [lastRemoveItem, setLastRemoveItem] = useState(
        "*Click on items to remove them"
    );
    const [itemsList, setItemsList] = useState(initialList);

    useEffect(() => {
        localStorage.setItem("itemsList", JSON.stringify(itemsList));
    }, [itemsList]);

    // Remove an item from the list
    const removeItem = (e) => {
        // Select the li element
        const li =
            e.target.localName === "span" ? e.target.parentNode : e.target;

        // Remove item from state
        setItemsList((currItemsList) => {
            return currItemsList.filter((item) => {
                if (item.id === li.id) {
                    console.log("removed: ", item.product);
                    setLastRemoveItem(`${item.product} removed!`);
                }
                return item.id !== li.id;
            });
        });
    };
    return (
        <div className="ShoppingList">
            <h1>Shopping List</h1>
            <ul>
                {itemsList.map((item) => {
                    return (
                        <li id={item.id} key={item.id} onClick={removeItem}>
                            <span>{item.product}</span> <span>x{item.qty}</span>
                        </li>
                    );
                })}
            </ul>
            <hr />
            <p className="mini-text removed">{lastRemoveItem}</p>
            <ShoppingListForm setItemsList={setItemsList} uid={uid} />
        </div>
    );
}
