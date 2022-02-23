import React, { useEffect, useState } from "react";

import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import ReactMarkdown from "react-markdown";
import MainScreen from "../../helpers/MainScreen/MainScreen";
import ErrorMessage from "../../Loader/ErrorMessage";
import Loading from "../../Loader/Loading";
import { createNoteAction } from "../../../redux/actions/notesActions";

function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error, note } = noteCreate;

  console.log(note);


  // function ini akan mengkosongkan field yang sudah tersubmit 
  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNoteAction(title, content, category)); // jika sukses,  mengecek fucntion ini terlebih dahulu
    if (!title || !content || !category) return;

    resetHandler(); // setelah sukses akan memanggil function reset form 
    history.push("/mynotes"); // step slanjutnya akan mengirim user ke halaman selanjutnya 
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Create a Note">
      <Card>
        <Card.Header>Create a new Note</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
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
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Note
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateNote;
