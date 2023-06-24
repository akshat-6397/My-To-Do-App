import React, { useEffect, useState } from "react";
import Todo from "../Images/Todo.png";
import "./Main.css";

const Main = () => {
  const [item, setItem] = useState("");
  const [itemList, setItemList] = useState([]);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    setItemList(JSON.parse(localStorage.getItem("list")));
  }, []);

  const handleAddClick = () => {
    if (item?.length < 3) {
      alert("Please enter correct task");
    } else if (item?.length && !toggleSubmit) {
      setItemList(
        itemList?.length &&
          itemList?.map((ele) => {
            if (ele.id === editItemId) {
              return {
                ...ele,
                name: item?.length > 20 ? item?.slice(0, 20) + "..." : item,
              };
            }
            return ele;
          })
      );
      setToggleSubmit(true);
      setItem("");
    } else {
      if (item?.length > 20) {
        setItemList([
          ...itemList,
          {
            id: new Date().getTime().toString(),
            name: item?.slice(0, 20) + "...",
          },
        ]);
        setItem("");
      } else {
        setItemList([
          ...itemList,
          { id: new Date().getTime().toString(), name: item },
        ]);
        setItem("");
      }
    }
  };

  const handleDeleteClick = (id) => {
    const filteredItems = itemList?.filter((ele) => {
      return ele.id !== id;
    });
    setItemList(filteredItems);
  };

  const handleRemoveAll = () => {
    setItemList([]);
    localStorage.clear();
  };

  const handleEditClick = (id) => {
    let element = itemList?.find((ele) => {
      return ele.id === id;
    });
    setItem(element?.name);
    setToggleSubmit(false);
    setEditItemId(id);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddClick();
    }
  };

  const handleAddtoLocal = () => {
    localStorage.setItem("list", JSON.stringify(itemList));
    alert("All Items added to Local Storage");
  };

  return (
    <div className="main-container">
      <div className="sub-container">
        <div className="image">
          <img src={Todo} alt="" />
          <span>Add your List here</span>
        </div>
        <div className="add-Items">
          <input
            type="text"
            placeholder="Add Items....."
            value={item}
            onChange={(e) => setItem(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {toggleSubmit ? (
            <i
              className="fa-solid fa-plus add-btn"
              title="Add Item"
              onClick={handleAddClick}
            ></i>
          ) : (
            <i
              className="fa-solid fa-edit add-btn editBtn"
              title="Edit Item"
              onClick={handleAddClick}
            ></i>
          )}
        </div>
        {itemList?.map((ele) => {
          return (
            <div className="showItems" key={ele?.id}>
              <div className="eachItem">
                <h5>{ele.name}</h5>
                <div className="icons">
                  <i
                    className="fa-solid fa-edit edit-btn"
                    title="Edit Item"
                    onClick={() => handleEditClick(ele?.id)}
                  ></i>
                  <i
                    className="fa-solid fa-trash-alt"
                    title="Delete Item"
                    onClick={() => handleDeleteClick(ele?.id)}
                  ></i>
                </div>
              </div>
            </div>
          );
        })}
        <div className="btn-parent" onClick={handleRemoveAll}>
          <button className="btn">Remove All</button>
        </div>
        <div className="second-btn-parent" onClick={handleAddtoLocal}>
          <button className="second-btn">Add to local Storage</button>
        </div>
      </div>
    </div>
  );
};
export default Main;
