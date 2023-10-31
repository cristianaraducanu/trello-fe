import { Close } from "@mui/icons-material";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";

export default function EditBoardModal({ board, setBoard, onRequestClose }) {
  const [boardName, setBoardName] = useState(board.name);
  const { put } = useFetch();

  const onEditBoard = async (e) => {
    e.preventDefault();
    console.log(boardName);
    if (!boardName) return;
    try {
      await put("/board", { id: board.id, name: boardName });
      setBoard({ ...board, name: boardName });
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
          <h2>Edit board</h2>
          <IconButton aria-label="close" onClick={onRequestClose}>
            <Close />
          </IconButton>
        </Stack>

        <TextField
          label="Board name"
          variant="standard"
          sx={{ width: "100%" }}
          autoFocus
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
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
            onClick={onEditBoard}
            style={{
              fontFamily: "Poppins",
              color: "#FDF7FA",
              fontSize: "18px",
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
