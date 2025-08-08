import mongoose from "mongoose";

const momentSchema = new mongoose.Schema(
  {
    cafeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cafe",
      required: true,
    },
    selectedDrinks: [
      {
        drinkName: {
          type: String,
          required: true,
          trim: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        quantity: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    dateTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Moment = mongoose.model("Moment", momentSchema);
export default Moment;
