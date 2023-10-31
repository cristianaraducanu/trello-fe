import { Close } from "@mui/icons-material";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";

export default function AddBoardModal({ onRequestClose, onAddBoard }) {
  const [name, setName] = useState("");
  const { post } = useFetch();

  const onCreateBoard = async (e) => {
    e.preventDefault();
    if (!name) return;
    try {
      const res = await post("/board/create", { name });
      onAddBoard(res);
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
          <h3>Add a board</h3>
          <IconButton aria-label="close" onClick={onRequestClose}>
            <Close />
          </IconButton>
        </Stack>

        <form onSubmit={onCreateBoard}>
          <TextField
            fontFamily="Poppins"
            label="Board name"
            variant="standard"
            sx={{ width: "100%" }}
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
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
              type="submit"
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
        </form>
      </div>
    </div>
  );
}
