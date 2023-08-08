import { useAppSelector } from '../hooks/typedHooks';
import { Typography, Paper, Card, Link, Box } from '@mui/material';
function DataPage() {
  const isMobile = useAppSelector((state) => state.ui.isMobile);
  const pageContent = (
    <>
      <Typography component='h1' variant='h4' color='primary'>
        Data Analytics Projects
      </Typography>
      <Card variant={isMobile ? 'elevation' : 'outlined'} sx={{ m: 2, p: 2 }}>
        <Typography component='h2' variant='h6'>
          Tornadoes in the U.S. Over Seven Decades
        </Typography>
        {/* <Typography component='p'>
    Visualizing the number, intensity, and impact of tornadoes in the U.S.
    from 1950 to 2021
  </Typography> */}
        <ul>
          <li>
            <Link href='https://public.tableau.com/app/profile/lele.mathis/viz/TornadoesintheU_S_1950-2021Updated/Dashboard'>
              Data Visualization in Tableau
            </Link>
          </li>
        </ul>
      </Card>
      <Card variant={isMobile ? 'elevation' : 'outlined'} sx={{ m: 2, p: 2 }}>
        <Typography component='h2' variant='h6'>
          Analysis of Alternative Fuel Stations
        </Typography>
        <ul>
          <li>
            <Link href='https://github.com/lele-mathis/PortfolioProjects/blob/main/Alt_Fuel_Stations_SQL_Data_Cleaning.ipynb'>
              Data Cleaning in SQL
            </Link>
          </li>
          <li>
            <Link href='https://github.com/lele-mathis/PortfolioProjects/blob/main/Alt_Fuel_Stations_SQL_EDA.ipynb'>
              Data Exploration in SQL
            </Link>
          </li>
          <li>
            <Link href='https://public.tableau.com/app/profile/lele.mathis/viz/HydrogenFuelStations/HydrogenDashboard?publish=yes'>
              Data Visualization in Tableau
            </Link>
          </li>
        </ul>
      </Card>
    </>
  );

  if (isMobile) {
    return <Box sx={{ m: 1 }}>{pageContent}</Box>;
  } else {
    return <Paper sx={{ m: 2, p: 2 }}>{pageContent}</Paper>;
  }
}

export default DataPage;
