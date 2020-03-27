import React, { useState } from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, getData }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now? colorToEdit


    axiosWithAuth()
    .put(`colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      setColorToEdit(initialColor);
      setEditing(false);
      getData(); // could've filtered and used updateColors instead but I want stretch and sleep
    })
    .catch(err => console.log(err));

  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`colors/${colorToEdit.id}`)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
    .post('colors', newColor)
    .then(res => getData())
    .catch(err => console.log(err));
  }

  const onChange = (e) => {
    if (e.target.name === 'color') {
      setNewColor({
      ...newColor,
      [e.target.name]: e.target.value
      });
    } else {
      setNewColor({
        ...newColor,
        code: {
          ...newColor.code,
          hex: e.target.value
        }
      })
    }
    console.log(newColor)
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color);
                    getData();
                  }
                }>
                  [x]
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit = {onSubmit}>
        <p>Add a color</p>
        <label name = 'color'>Color Name</label>
        <input htmlFor = 'color' name = 'color' onChange = {onChange} value = {newColor.color}/>
        <label name = 'hex'>Hex</label>
        <input htmlFor = 'hex' name = 'hex' onChange = {onChange} value = {newColor.code.hex}/>
        <button>submit</button>
      </form>
    </div>
  );
};

export default ColorList;
