import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRouter } from "next/router";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function StatisticCard({
  title,
  subtitle,
  total,
  lastUpdate,
  description,
  color,
  textColor,
  nav
}) {
  const router = useRouter();

  return (
    <Card sx={{ minWidth: 275, backgroundColor: color, boxShadow:3 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Typography
              variant="h5"
              component="div"
              color={textColor}
              sx={{ fontWeight: "bold" }}
            >
              {title}
            </Typography>
            <Typography sx={{ opacity: 0.8 }} color={textColor} gutterBottom>
              Jumlah {total}
            </Typography>
            <Typography variant="body2" color={textColor} sx={{ fontSize: 14 }}>
              {description}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography color={textColor}>{lastUpdate}</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions>
        <Button size="medium" onClick={() => router.push(`/${nav}`)}>
          <Typography color={textColor}>
            Details
            <ArrowForwardIosIcon sx={{ fontSize: 14, ml: 2 }} />
          </Typography>
        </Button>
      </CardActions>
    </Card>
  );
}
