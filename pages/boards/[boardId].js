import { Add, MoreHoriz } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import List from "../../components/List";
import AddListModal from "../../components/modals/AddListModal";
import EditBoardModal from "../../components/modals/EditBoardModal";
import useFetch from "../../hooks/useFetch";
import useTitle from "../../hooks/useTitle";

export default function Board() {
  const router = useRouter();
  const { get, _delete } = useFetch();

  const [board, setBoard] = useState();
  const [lists, setLists] = useState([]);
  const [editBoard, setEditBoard] = useState(false);
  const [addList, setAddList] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to remove this board?")) {
      await _delete(`/board/${board.id}`);
      router.push("/");
    }
  };

  const boardId = router.query.boardId;

  useTitle(board?.name || "");

  useEffect(() => {
    if (boardId) {
      get(`/board/${boardId}`).then(setBoard);
    }
  }, [boardId]);

  useEffect(() => {
    if (boardId) {
      get("/cardsList/list/" + boardId).then(setLists);
    }
  }, [boardId]);

  if (!board) {
    return undefined;
  }

  return (
    <Layout>
      <div
        className="container"
        style={{ marginLeft: "100px", marginTop: "0px" }}
      >
        {addList && (
          <AddListModal
            boardId={boardId}
            setLists={setLists}
            onRequestClose={() => setAddList(false)}
          />
        )}

        {editBoard && (
          <EditBoardModal
            board={board}
            onRequestClose={() => setEditBoard(false)}
            setBoard={setBoard}
          />
        )}

        <Stack direction="row" alignItems="center">
          <a
            style={{
              fontSize: "33px",
              marginTop: "70px",
              marginBottom: "70px",
              fontWeight: "bold",
              color: "#60435F",
            }}
          >
            {board.name}
          </a>

          <IconButton
            id="board-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={openMenu}
            sx={{ ml: 2 }}
          >
            <MoreHoriz />
          </IconButton>
          <Menu
            id="board-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={closeMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                closeMenu();
                setEditBoard(true);
              }}
            >
              Edit
            </MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </Stack>

        <div className="lists-container">
          {lists.map((list) => (
            <List key={list.id} list={list} setLists={setLists} />
          ))}

          <div className="add-list-btn" onClick={() => setAddList(true)}>
            <Stack
              alignItems="center"
              direction="row"
              style={{
                fontFamily: "Poppins",
                color: "#60435F",
                fontSize: "18px",
              }}
            >
              <Add sx={{ mr: 1, color: "#777" }} fontSize="small" /> Add a list
            </Stack>
          </div>
        </div>
      </div>
    </Layout>
  );
}
