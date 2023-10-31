import { Close, Save } from "@mui/icons-material";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";

export default function EditListModal({ list, onRequestClose, setLists }) {
  const [listName, setListName] = useState(list.name);

  const { put } = useFetch();

  const onEditList = async (e) => {
    e.preventDefault();
    console.log(listName);
    if (!listName) return;
    try {
      await put("/cardsList", { id: list.id, name: listName });

      setLists((lists) =>
        lists.map((l) => {
          if (l.id === list.id) {
            return { ...list, name: listName };
          }
          return l;
        })
      );

      onRequestClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal-container" onClick={onRequestClose}>
      <div
        className="modal add-list-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <h2>Edit cards list</h2>
          <IconButton aria-label="close" onClick={onRequestClose}>
            <Close />
          </IconButton>
        </Stack>

        <TextField
          label="List name"
          variant="standard"
          sx={{ width: "100%" }}
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          autoFocus
        />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 4 }}
        >
          <div style={{ display: "flex", justifyContent: "end" }}></div>

          <Button
            variant="outlined"
            onClick={onEditList}
            style={{
              fontFamily: "Poppins",
              color: "#FDF7FA",
              fontSize: "20px",
              border: "3px solid #60435F",
              borderRadius: "8px",
              background: "#60435F",
            }}
          >
            Save
          </Button>
        </Stack>
      </div>
    </div>
  );
}
