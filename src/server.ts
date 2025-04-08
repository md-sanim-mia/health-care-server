import app from "./app";

const port = 5000;

async function main() {
  app.listen(port, () => {
    console.log(`App is listening on port  ${port}`);
  });
}

main();
