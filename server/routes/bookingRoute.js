<<<<<<< HEAD
const router = require("express").Router()
const express = require("express")
const stripe = require("stripe")(
  "sk_test_51JKPQWSJULHQ0FL7LbqLKOaIcjurlUcdP2hJQkXZw3txlhh0hFrEEEOTwdVxf6sWKqLIrerKpV5EfGvmvntYu7Mt00vJq4YQKL"
)
const authMiddleware = require("../middlewares/authMiddleware")
const Booking = require("../models/bookingModel")
const Show = require("../models/showModel")
const EmailHelper = require("../utils/emailSender")

const endpointSecret =
  "whsec_774b9109545b45e18af845534afa4e7e0d144a1a57db46482ca7886c10cd5a5a"

// Webhook endpoint
router.post(
  "/webhook",
  express.raw({ type: "sapplication/json" }),
  (request, response) => {
    console.log("Webhook Called")
    const sig = request.headers["stripe-signature"]
    let event

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret)
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`)
      return
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object
        handlePaymentIntentSucceeded(paymentIntent)
        break
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    response.send()
  }
)

// Function to handle payment_intent.succeeded event
async function handlePaymentIntentSucceeded(paymentIntent) {
  console.log("Succesfull")
=======
const router = require("express").Router();
const express = require("express");
const stripe = require("stripe")(
  "pk_test_51PdWcORocnvjLyWkRJ5TfRin1dyvPbO4B00yYmb7TCb1xl2hftBkTMad0BlfSbjpgTvLw2aPBljT9aVcevDYefKr00mDySURB2"
);
const authMiddleware = require("../middlewares/authMiddleware");
const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");
const EmailHelper = require("../utils/emailSender");

const endpointSecret = "whsec_5e60043182e3caeac03b898a9ec579c29cbbf85f941f737d1340169bf9311e4b";

 // Webhook endpoint 
router.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
  console.log('Webhook Called')
  const sig = request.headers['stripe-signature'];
  let event;

try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      handlePaymentIntentSucceeded(paymentIntent);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }





  response.send();
});

// Function to handle payment_intent.succeeded event
async function handlePaymentIntentSucceeded(paymentIntent) {
  console.log('Succesfull')
>>>>>>> origin/main
  console.log(paymentIntent)
}

router.post("/make-payment", async (req, res) => {
  try {
<<<<<<< HEAD
    const { token, amount } = req.body
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    })
=======
    const { token, amount } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
>>>>>>> origin/main

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: customer.id,
      payment_method_types: ["card"],
      receipt_email: token.email,
      description: "Token has been assigned to the movie!",
<<<<<<< HEAD
    })
=======
    });
>>>>>>> origin/main

    // const charge = await stripe.charges.create({
    //     amount: amount,
    //     currency: "usd",
    //     customer: customer.id,
    //     receipt_email: token.email,
    //     description: "Token has been assigned to the movie!"
    // });

<<<<<<< HEAD
    const transactionId = paymentIntent.id
=======
    const transactionId = paymentIntent.id;
>>>>>>> origin/main

    res.send({
      success: true,
      message: "Payment Successful! Ticket(s) booked!",
      data: transactionId,
<<<<<<< HEAD
    })
=======
    });
>>>>>>> origin/main
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
<<<<<<< HEAD
    })
  }
})
=======
    });
  }
});
>>>>>>> origin/main

// Create a booking after the payment
router.post("/book-show", async (req, res) => {
  try {
<<<<<<< HEAD
    const newBooking = new Booking(req.body)
    await newBooking.save()

    const show = await Show.findById(req.body.show).populate("movie")
    const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats]
    await Show.findByIdAndUpdate(req.body.show, {
      bookedSeats: updatedBookedSeats,
    })

    const populatedBooking = await Booking.findById(newBooking._id)
      .populate("user")
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      })

    console.log("this is populated Booking", populatedBooking)
=======
    const newBooking = new Booking(req.body);
    await newBooking.save();

    const show = await Show.findById(req.body.show).populate("movie");
    const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];
    await Show.findByIdAndUpdate(req.body.show, {
      bookedSeats: updatedBookedSeats,
    });

    const populatedBooking = await Booking.findById(newBooking._id).populate("user")
    .populate("show")
    .populate({
      path: "show",
      populate: {
        path: "movie",
        model: "movies",
      },
    })
    .populate({
      path: "show",
      populate: {
        path: "theatre",
        model: "theatres",
      },
    });


    console.log("this is populated Booking", populatedBooking);
>>>>>>> origin/main
    // console.log(populatedBooking.user.email);

    res.send({
      success: true,
      message: "New Booking done!",
      data: populatedBooking,
<<<<<<< HEAD
    })

    await EmailHelper("ticketTemplate.html", populatedBooking.user.email, {
      name: populatedBooking.user.name,
      movie: populatedBooking.show.movie.title,
      theatre: populatedBooking.show.theatre.name,
      date: populatedBooking.show.date,
      time: populatedBooking.show.time,
      seats: populatedBooking.seats,
      amount: populatedBooking.seats.length * populatedBooking.show.ticketPrice,
      transactionId: populatedBooking.transactionId,
    })
=======
    });

    await EmailHelper("ticketTemplate.html", populatedBooking.user.email, {
       name: populatedBooking.user.name,
       movie : populatedBooking.show.movie.title,
       theatre : populatedBooking.show.theatre.name,
       date:populatedBooking.show.date,
       time:populatedBooking.show.time,
       seats : populatedBooking.seats,
       amount : populatedBooking.seats.length * populatedBooking.show.ticketPrice,
       transactionId : populatedBooking.transactionId,
       
       

    });
>>>>>>> origin/main
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
<<<<<<< HEAD
    })
  }
})
=======
    });
  }
});
>>>>>>> origin/main

router.get("/get-all-bookings", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.body.userId })
      .populate("user")
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
<<<<<<< HEAD
      })
=======
      });
>>>>>>> origin/main

    res.send({
      success: true,
      message: "Bookings fetched!",
      data: bookings,
<<<<<<< HEAD
    })
=======
    });
>>>>>>> origin/main
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
<<<<<<< HEAD
    })
  }
})

module.exports = router
=======
    });
  }
});

module.exports = router;
>>>>>>> origin/main
