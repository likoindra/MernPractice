import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import ReactMarkdown from "react-markdown";
import MainScreen from "../../helpers/MainScreen/MainScreen";
import Loading from "../../Loader/Loading";
import ErrorMessage from "../../Loader/ErrorMessage";
import { deleteNoteAction, updateNoteAction } from "../../../redux/actions/notesActions";

export default function SingleNote() {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch();

  const noteUpdate = useSelector((state) => state.noteUpdate); //memanggil noteUpdate state dari redux menggunakan useSelector
  const { loading, error } = noteUpdate;


//   didalam page ini akan ada `delete` juga seperti pada `myNotes.js` karena tampilan ini yang akan di tampilkan pada page `/mynotes`
  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
    history.push("/mynotes");
  };

  // useEffect akan bekerja saat page loaded dan saat dependeciesnya berubah
  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${match.params.id}`); // match.params.id disini akan menngidentifikasi id dari user , dan mencocokan denan user yang ada pada database

      //setelah itu menggunakan { data } yang sudah ada untuk digunakan pada value pada form yaitu seperti diabawah :
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching(); // memanggil function yang ada diatas
  }, [match.params.id, date]); // jika kedua dependencies ini berubah akan memanggil fuction yang ada pada useEffect

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  // pada step ini akan mengirim data yang sudah di isi pada form update untuk dikirimkan ke database
  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction(match.params.id, title, content, category));
    if (!title || !content || !category) return;

    resetHandler(); // dan setelah proses berhasil akan memanggil function resetHandler
    history.push("/mynotes"); // menuju ke page selanjutnya
  };

  return (
    <MainScreen title="Edit Note">
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Note
            </Button>
            <Button
              className="mx-2"
              variant="danger"
                onClick={() => deleteHandler(match.params.id)}
            >
              Delete Note
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}
