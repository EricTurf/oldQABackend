import jwt from "jsonwebtoken";

export default (token, callback) => {
  console.log(token);
  jwt.verify(token, "ilikepie", function(err, decoded) {
    if (err) {
      callback(new Error("Error decoding token"));
    } else {
      console.log(decoded);
      callback(null, decoded);
    }
  });
};
