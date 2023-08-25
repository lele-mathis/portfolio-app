//uses web element from Tableau JavaScript Embedding API v3, requires script in index.html to work
const HydrogenDashboard = () => {
  const url =
    'https://public.tableau.com/views/HydrogenFuelStations/HydrogenDashboard?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link';
  return (
    <div
      className='viz-container'
      style={{
        width: '100%',
        marginTop: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <tableau-viz
        id='tableauViz'
        width='1000'
        height='827'
        style={{
          border: 'solid',
          borderColor: '#ccc',
        }}
        src={url}
      ></tableau-viz>
    </div>
  );
};

export default HydrogenDashboard;
