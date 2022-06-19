import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import Grid from "@mui/material/Grid";

export default function ClassList(props) {
  const [gen, setGen] = useState(null);
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);
  const [item, setItem] = useState("");
  const [newItem, setNewItem] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    props.file(newItem);
  }, [newItem]);

  const handleChange = (event) => {
    setItem(event.target.value);
  };

  const handleClick = () => {
    if (item != "") {
      setNewItem((prev) => {
        return [...prev, item];
      });

      setItem("");
      setError("");
    } else {
      setError("The class should not be an empty string!");
    }
  };

  const handleDelete = (v) => {
    setNewItem(
      newItem.filter((item) => {
        console.log(item);
        return item != v;
      })
    );
  };

  const thirdEvent = () => {
    setNewItem([]);
  };

  return (
    <div>
      <Grid item xs={12} md={6}>
        Edit your classification classes here:
        <input
          type="text"
          value={item}
          placeholder="Add a class"
          onChange={handleChange}
          className="input_class"
        />
        <Button className="AddBtn" onClick={handleClick}>
          <AddIcon />
        </Button>
        {error ? (
          <p style={{ color: "red", fontSize: "14px" }}>{error}</p>
        ) : null}
        <div>
          {newItem != "" ? (
            <List
              dense={true}
              sx={{
                maxWidth: 360,
                color: "black",
                bgcolor: "background.paper",
                position: "relative",
                overflow: "auto",
                maxHeight: 300,
                "& ul": { padding: 0 },
              }}
            >
              {newItem.map((value, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        handleDelete(value);
                      }}
                    >
                      <DeleteIcon
                        sx={{
                          color: "red",
                        }}
                      />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={value}
                    secondary={secondary ? "Secondary text" : null}
                  />
                </ListItem>
              ))}
            </List>
          ) : null}
        </div>
      </Grid>
    </div>
    /*{"iv>
       "}
      <d  <div className="childOne">
          <br />
          <br />
          <ul className="textFont">
            {newItem.map((val, i) => {
              return <li key={i}> {val} </li>;
            })}
          </ul>
        </div>
        <br />
        <br />
        <div className="childTwo">
          <Button className="delBtn" onClick={thirdEvent}>
            <DeleteIcon />
            Delete All
          </Button>
        </div>
      </div>
      */
  );
}
