// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  fetch(
    `https://cazadescuentos.net/api/discounts?limit=${req.query.limit || 10}`
  )
    .then((response) => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }

      return response.json();
    })
    .then((response) => {
      return res.status(200).json(response.data);
    })
    .catch((err) => {
      res.status(400).json({ message: "Failed loading the resource" });
    });
};
