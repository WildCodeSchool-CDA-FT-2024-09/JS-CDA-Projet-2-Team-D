import { useRouteError } from "react-router-dom";
import Container from "@mui/material/Container";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <Container fixed sx={{ flexGrow: 1 }}>
        <h1 className="text-3xl">Oops!</h1>
        <p>Désolé, une erreur est survenue.</p>
      </Container>
    </>
  );
}
