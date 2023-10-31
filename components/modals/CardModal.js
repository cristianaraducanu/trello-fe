import { Close, Delete, Edit } from "@mui/icons-material";
import { IconButton, Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";

export default function CardModal({
  card: originalCard,
  list,
  setCards,
  isNewCard,
  onRequestClose,
}) {
  const { post, put, _delete } = useFetch();
  const [card, setCard] = useState(originalCard);
  const [edit, setEdit] = useState(isNewCard);
  const [title, setTitle] = useState(card?.title || "");
  const [description, setDescription] = useState(card?.description || "");

  const onSave = async () => {
    if (!title) return;

    if (isNewCard) {
      const res = await post(`/card/create`, {
        title,
        description,
        listId: list.id,
      });
      setCards((cards) => [...cards, res]);
      onRequestClose();
    } else {
      const res = await put(`/card`, { id: card.id, title, description });
      setCards((cards) =>
        cards.map((c) => {
          if (c.id === card.id) {
            return res;
          }
          return c;
        })
      );
      setCard(res);
      setEdit(false);
    }
  };

  const onDelete = async () => {
    await _delete(`/card/${card.id}`);
    onRequestClose();
    setCards((cards) => cards.filter((c) => c.id !== card.id));
  };

  return (
    <div className="modal-container" onClick={onRequestClose}>
      <div className="modal card-modal" onClick={(e) => e.stopPropagation()}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {!edit && <h2>{card.title}</h2>}

          {edit && (
            <TextField
              label="Card name"
              variant="standard"
              type="text"
              value={title}
              sx={{ my: 2 }}
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          )}

          <IconButton aria-label="close" onClick={onRequestClose}>
            <Close />
          </IconButton>
        </Stack>
        {!edit && <div className="card-description">{card.description}</div>}

        {edit && (
          <TextField
            label="Card description"
            multiline
            maxRows={8}
            sx={{ my: 1, width: "100%" }}
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        )}

        <Stack direction="row" justifyContent="space-between">
          {edit && (
            <div style={{ display: "flex", justifyContent: "end" }}></div>
          )}
          <Button
            style={{
              fontFamily: "Poppins",
              color: "#FDF7FA",
              fontSize: "20px",
              border: "3px solid #60435F",
              borderRadius: "8px",
              background: "#60435F",
            }}
            variant="outlined"
            startIcon={edit ? undefined : <Edit />}
            onClick={() => {
              if (edit) onSave();
              else setEdit(true);
            }}
            sx={{ mt: 3 }}
          >
            {edit ? "Save" : "Edit"}
          </Button>

          {!isNewCard && (
            <Button
              variant="outlined"
              startIcon={<Delete />}
              onClick={onDelete}
              sx={{ mt: 3 }}
              color="error"
              style={{
                fontFamily: "Poppins",
                color: "#FDF7FA",
                fontSize: "20px",
                border: "3px solid #60435F",
                borderRadius: "8px",
                background: "#60435F",
              }}
            >
              Delete
            </Button>
          )}
        </Stack>
      </div>
    </div>
  );
}
