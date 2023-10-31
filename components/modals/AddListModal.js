import { Close } from "@mui/icons-material";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";

export default function AddListModal({ boardId, onRequestClose, setLists }) {
  const [listName, setListName] = useState("");
  const { post } = useFetch();

  async function saveList() {
    const list = await post("/cardsList/create", {
      boardId: boardId,
      name: listName,
    });
    setLists((lists) => [...lists, list]);
    onRequestClose();
  }

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
          <h2>Add a list</h2>
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
            onClick={saveList}
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
