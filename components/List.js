import { Add, MoreHoriz } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import CardModal from "./modals/CardModal";
import EditListModal from "./modals/EditListModal";

export default function List({ list, setLists }) {
  const { get, _delete } = useFetch();
  const [cards, setCards] = useState([]);
  const [openCard, setOpenCard] = useState(null);
  const [addCard, setAddCard] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to remove this list?")) {
      await _delete(`/cardsList/${list.id}`);
      setLists((lists) => lists.filter((l) => l.id !== list.id));
      closeMenu();
    }
  };

  useEffect(() => {
    get(`/card/list/${list.id}`).then(setCards);
  }, []);

  return (
    <div className="list">
      {openCard && (
        <CardModal
          card={openCard}
          list={list}
          setCards={setCards}
          onRequestClose={() => setOpenCard(null)}
        />
      )}

      {openEditModal && (
        <EditListModal
          list={list}
          setLists={setLists}
          onRequestClose={() => setOpenEditModal(false)}
        />
      )}

      {addCard && (
        <CardModal
          isNewCard={true}
          list={list}
          setCards={setCards}
          onRequestClose={() => setAddCard(false)}
        />
      )}

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h4 className="list-title">{list.name}</h4>

        <IconButton
          id="list-menu-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={openMenu}
        >
          <MoreHoriz />
        </IconButton>
        <Menu
          id="list-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={closeMenu}
          MenuListProps={{
            "aria-labelledby": "list-menu-button",
          }}
        >
          <MenuItem
            onClick={() => {
              closeMenu();
              setOpenEditModal(true);
            }}
          >
            Edit
          </MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </Stack>

      {cards.map((card) => (
        <div key={card.id} className="card" onClick={() => setOpenCard(card)}>
          {card.title}
        </div>
      ))}

      <div className="add-card-btn" onClick={() => setAddCard(true)}>
        <Stack alignItems="center" direction="row">
          <Add sx={{ mr: 1, color: "60435F" }} fontSize="small" /> Add a card
        </Stack>
      </div>
    </div>
  );
}
