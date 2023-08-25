import { useAppSelector } from '../hooks/typedHooks';
import { Typography, Paper, Card, Link, Box } from '@mui/material';
import TornadoDashboard from '../components/TornadoDashboard';

function DataPage() {
  document.title = 'Data Analytics Projects | Lele Mathis Portfolio';
  const isNarrow = useAppSelector((state) => state.ui.isNarrow);

  const pageContent = (
    <>
      <Typography component='h1' variant='h4' color='primary'>
        Data Analytics Projects
      </Typography>
      <Card variant={isNarrow ? 'elevation' : 'outlined'} sx={{ m: 2, p: 2 }}>
        <Typography component='h2' variant='h5'>
          Time Series Analysis: Tornadoes Over Seven Decades
        </Typography>
        <p>
          Visualizing the number, intensity, and impact of tornadoes in the U.S.
          from 1950 to 2021. Data cleaning done in MS Excel, data visualization
          in Tableau.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {isNarrow ? (
            <Link href='https://public.tableau.com/views/TornadoesintheU_S_1950-2021Updated/Dashboard?:language=en-US&:display_count=n&:origin=viz_share_link'>
              View dashboard on Tableau Public
            </Link>
          ) : (
            <TornadoDashboard />
          )}
        </div>
      </Card>
      <Card variant={isNarrow ? 'elevation' : 'outlined'} sx={{ m: 2, p: 2 }}>
        <Typography component='h2' variant='h5'>
          Geographic Analysis: Alternative Fuel Stations
        </Typography>
        <p>
          Investigating the number, accessibility, and geographic distribution
          of automobile fuel stations in the U.S., focusing on hydrogen fuel
          stations.
        </p>
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

  if (isNarrow) {
    return <Box sx={{ m: 1 }}>{pageContent}</Box>;
  } else {
    return <Paper sx={{ m: 2, p: 2 }}>{pageContent}</Paper>;
  }
}

export default DataPage;
