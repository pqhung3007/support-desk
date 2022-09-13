import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getTicketDetail } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";

function Ticket() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ticket } = useSelector((state) => state.tickets);
  const { ticketId } = useParams();

  useEffect(() => {
    dispatch(getTicketDetail(ticketId)).unwrap().catch(toast.error);
  }, [ticketId, dispatch]);

  if (!ticket) {
    return <Spinner />;
  }

  const { _id, status, createdAt, product, description } = ticket;
  return (
    <div className="ticket-page">
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
    </div>
  );
}

export default Ticket;