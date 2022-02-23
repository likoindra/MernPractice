import React, { useEffect } from "react";
import Styles from "./MyNote.module.css";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import MainScreen from "../helpers/MainScreen/MainScreen";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../redux/actions/notesActions";
import Loading from "../Loader/Loading";
import ErrorMessage from "../Loader/ErrorMessage";

// import axios from "../axiosInstance";
// import ReactMarkdown from "react-markdown";

// import { notes } from "../data/notes";

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList; // memanggil component pada notelist yakni error , notes , loading

  // disaat logout pada halamam ini akan menuju pada halaman login
  // dengan mengambil state dari userLogin , sama seperti implementasi di LoginScreen
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin; // menggunakan userInfo untuk mengecek apakaha user sudah terdaftar / tidak, di gunakan pada useEffect

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate; // proses ini akan mem trigger useEffect jadi `successCreate` akan terpanggil pada dependencies

  // memanggil state dari noteUpdate untuk mengupdate note yang sudah diupdate dan memunculkan pada page `ini`
  const noteUpdate = useSelector((state) => state.noteUpdate); //memanggil noteUpdate state dari redux menggunakan useSelector
  const { success: successUpdate } = noteUpdate; //memanggil payload { success } dan diapanggil pada useEffect

  // memanggil state dari noteDetele untuk mengambil function di daalamnya
  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete; // karena loading ,error dan success sudah ada, jadi untuk function `delete` diganti

  // const [notes, setNotes] = useState([]);
  // delete function
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ?")) {
      // didalam ini jika user menekan `ok`
      // akan memanggil dispatch `delete` pada `noteAction`
      dispatch(deleteNoteAction(id)); // menggunakan `id` karena kita akan mendelete dari `id` user
    }
  };
  // const fetchNotes = async () => {
  //   const { data } = await axios.get("/api/notes");
  //   setNotes(data);
  // };
  // console.log(notes, "data");
  useEffect(() => {
    dispatch(listNotes()); // memanggil action pada redux
    // jika tidak ada data pada userInfo
    // jika tidak ada akan kembali ke halaman login
    if (!userInfo) {
      history.push("/");
    }

    // fetchNotes(); tidak menggunakan function ini karena sudah di define pada redux yaitu `noteActions`
  }, [
    dispatch,
    successCreate,
    history,
    userInfo,
    successUpdate,
    successDelete,
  ]); // 1. successUpdate ini dari state `noteUpdate` yang dimana akan muncul jika note sudah berhasil di update
  // 2. successDelete. jika function ini sukses akan membuat page ter re-load

  return (
    <MainScreen title={`Welcome back ${userInfo.name}`}>
      <Link to="/createnote">
        <Button>Create New Note</Button>
      </Link>
      {/* error dan loading dari deleteHandler */}
      {errorDelete && <ErrorMessage>{error}</ErrorMessage>}
      {loadingDelete && <Loading />}

      {/* rendering all the notes inside data and map the entire Card */}
      {/* akan trigger saat ada error terjadi  */}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {/* reverse() akan membuat note yang baru berada diatas  */}
      {notes
        ?.reverse()
        .filter((filteredNote) =>
          filteredNote.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((note) => (
          <Accordion key={note._id}>
            <Card style={{ margin: 10 }} key={note._id}>
              <Card.Header style={{ display: "flex" }}>
                <span
                  // onClick={() => ModelShow(note)}
                  className={Styles.Title}
                >
                  <Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
                    {note.title}
                  </Accordion.Toggle>
                </span>

                <div>
                  {/* function ini akan mengarahkan ke id yang sesuai dengan user  */}
                  <Button href={`/note/${note._id}`}>Edit</Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <h4>
                    <Badge variant="success">Category - {note.category}</Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <ReactMarkdown>{note.content}</ReactMarkdown>
                    <footer
                      className="blockquote-footer"
                      style={{ paddingTop: 20 }}
                    >
                      Created on{" "}
                      <cite title="Source Title">
                        {/* ini akan mengambim data createdAt pada database  */}
                        {note.createdAt.substring(0, 10)}
                      </cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))}
    </MainScreen>
  );
};

export default MyNotes;
