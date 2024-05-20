import bookingModel from "../models/bookingModel.js";
import userModel from "../models/userModel.js"


const bookingCreate = async (req, res) => {
    try {
        const newBooking = new bookingModel({
            userId: req.body.userId,
            items: req.body.items,
            table: req.body.table,
            seats: req.body.seats,
            time: req.body.time,
            date: req.body.date
        })
        await newBooking.save();
        const user = await userModel.findOne({ _id: req.body.userId });

        user.bookingData = [...user.bookingData, newBooking._id];

        user.save();

        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
      
        res.json({ success:true, data: newBooking });

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const bookings = async (req, res) => {
    try {
        const books = await bookingModel.find({});
        res.json({ success: true, data: books })
    } catch (error) {
        res.json({ success: false, message: "Error" })
    }
};

const usersWithBookings = async (req, res) => {
    try {
        const users = await userModel.find({}); 
        
        const data = users.filter(user => user.bookingData.length).map(user => {
            return { id: user._id, name: user.name, email: user.email };
        });

        res.json({ success: true, data });
    } catch (error) {
        res.json({ success: false, message: error });
    }
};

const getBookingsByUserId = async (req, res) => {
    try {
        const books = await bookingModel.find({ userId: req.params.id });
        
        res.json({ success: true, data: books })
    } catch (e) {
        res.json({ success: false, message: e.message })
    }
}

const userBookings = async (req, res) => {
    try {
        const books = await bookingModel.find({ userId: req.body.userId });
        
        res.json({ success: true, data: books })
    } catch (error) {
        res.json({ success: false, message: "Error" })
    }
}

const updateBookingStatus = async (req, res) => {
    try {
        const status = req.body.status;

        if (!status && (status !== "ACCEPTED" || status !== "CANCELED")) {
            res.json({ success: false, message: "Incorrect data" })
        } else {
            const booking = await bookingModel.findByIdAndUpdate(req.body.id, { status: req.body.status });
            res.json({ success: true, data: booking})
        }

    } catch(error) {
        res.json({ success: false, message: error.message })
    }
}

const deleteBooking = async (req, res) => {
    try {
        const book = await bookingModel.findByIdAndDelete(req.params.id);
        const user = await userModel.findById(book.userId);

        user.bookingData = user.bookingData.filter(b => {
            return b.toString() !== req.params.id;
        });

        user.save();

        console.log(user.bookingData);

        res.json({ success: true, message: "Recource successfully deleted" });

    } catch(error) {
        res.json({ success: false, message: error.message })
    }
}

export { bookingCreate, bookings, userBookings, updateBookingStatus, usersWithBookings, getBookingsByUserId, deleteBooking }