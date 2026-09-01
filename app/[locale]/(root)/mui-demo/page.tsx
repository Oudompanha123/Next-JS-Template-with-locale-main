"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function MuiDemoPage() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
      <Card sx={{ maxWidth: 420, width: "100%" }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h5" component="h1">
              MUI is wired up
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This page is the only thing on MUI in this project — everything
              else (login, logout, forms) still runs on shadcn/Tailwind. Build
              new features on whichever of the two fits, right here or
              elsewhere under <code>(root)</code>.
            </Typography>
            <TextField label="Try typing something" size="small" fullWidth />
            <Button variant="contained">MUI Button</Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
