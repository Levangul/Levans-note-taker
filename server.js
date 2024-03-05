const express = require('express');
const app = express();
const PORT = 3001 ||  process.env.PORT;


app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const apiRoutes = require("./routes/apiRoutes");
app.use(apiRoutes);
const htmlRoutes = require("./routes/htmlRoutes");
app.use(htmlRoutes);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

