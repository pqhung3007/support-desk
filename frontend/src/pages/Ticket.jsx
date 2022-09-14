import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { getTicketDetail, closeTicket } from "../features/tickets/ticketSlice";
import { getNotes, createNote } from "../features/notes/noteSlice";
import Spinner from "../components/Spinner";
import { BackButton } from "../components/BackButton";
import NoteItem from "../components/NoteItem";

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};
// bind modal to root html
Modal.setAppElement("#root");

function Ticket() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { ticket } = useSelector((state) => state.tickets);
  const { notes } = useSelector((state) => state.notes);
  const { ticketId } = useParams();

  useEffect(() => {
    dispatch(getTicketDetail(ticketId)).unwrap().catch(toast.error);
    dispatch(getNotes(ticketId)).unwrap().catch(toast.error);
  }, [ticketId, dispatch]);

  const handleCloseTicket = () => {
    dispatch(closeTicket(ticketId))
      .unwrap()
      .then(() => {
        toast.success("Ticket closed");
        navigate("/tickets");
      })
      .catch(toast.error);
  };

  const handleSubmitNote = (e) => {
    e.preventDefault();
    dispatch(createNote({ ticketId, noteContent }))
      .unwrap()
      .then(() => {
        setNoteContent("");
        closeModal();
      });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!ticket) {
    return <Spinner />;
  }

  const { _id, status, createdAt, product, description } = ticket;
  return (
    <div className="ticket-page">
      <BackButton />
      <header className="ticket-header">
        <h2>
          Ticket ID: {_id}
          <span className={`status status-${status}`}>{status}</span>
        </h2>
        <h3>Date Submitted: {new Date(createdAt).toLocaleString("en-US")}</h3>
        <h3>Product: {product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{description}</p>
        </div>
      </header>

      {ticket.status !== "closed" && (
        <button onClick={openModal} className="btn">
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={handleSubmitNote}>
          <div className="form-group">
            <textarea
              name="noteContent"
              id="noteContent"
              className="form-control"
              placeholder="Note Content"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      <h2>Notes</h2>
      {notes ? (
        notes.map((note) => <NoteItem key={note._id} note={note} />)
      ) : (
        <Spinner />
      )}

      {status !== "closed" && (
        <button
          onClick={handleCloseTicket}
          className="btn btn-block btn-danger"
        >
          Close Ticket
        </button>
      )}
    </div>
  );
}

export default Ticket;
