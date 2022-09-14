import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getTicketDetail, closeTicket } from "../features/tickets/ticketSlice";
import { getNotes } from "../features/notes/noteSlice";
import Spinner from "../components/Spinner";
import { BackButton } from "../components/BackButton";
import NoteItem from "../components/NoteItem";

function Ticket() {
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

      <h2>Notes</h2>
      {notes ? (
        notes.map((note) => <NoteItem key={note._id} note={note} />)
      ) : (
        <Spinner />
      )}

      {ticket.status !== "closed" && (
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
