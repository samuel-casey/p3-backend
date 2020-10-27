const quoteSchema = new Schema(
    {
      quote: String,
      theme: String,
      author: String,
          isFavorite: {type:Boolean, default: false}
    },
    {
          timestamps: true
    }
  );
  const Quote = model("Quote", quoteSchema);
  module.exports = Quote;