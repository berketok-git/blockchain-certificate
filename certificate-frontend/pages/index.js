import { Button } from "@mui/material";

export default function Home() {
  return (
    <div>
      <Button href="/create" variant="contained">
        Create Certificate
      </Button>
      <br />
      <br />
      <Button href="/issue" variant="contained">
        Issue Certificate
      </Button>
      <br />
      <br />
      <Button href="/view" variant="contained">
        View Certificate
      </Button>
    </div>
  );
}
