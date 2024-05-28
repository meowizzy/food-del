import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { bookings, userBookings, bookingCreate, updateBookingStatus, usersWithBookings, deleteBooking, getBookingsByUserId } from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.get("/withBookings", usersWithBookings);
bookingRouter.get("/bookingsById/:id", getBookingsByUserId);
bookingRouter.get("/all", bookings);
bookingRouter.get("/my", authMiddleware, userBookings);
bookingRouter.post("/create", authMiddleware, bookingCreate);
bookingRouter.delete("/delete/:id", deleteBooking);
bookingRouter.put("/updateStatus", updateBookingStatus);

export default bookingRouter;