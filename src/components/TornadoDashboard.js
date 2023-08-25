const TornadoDashboard = () => {
  const url =
    'https://public.tableau.com/views/TornadoesintheU_S_1950-2021Updated/Dashboard?:language=en-US&:display_count=n&:origin=viz_share_link';
  return (
    <div
      className='viz-container'
      width='1024'
      height='768'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <tableau-viz
        id='tableauViz'
        style={{
          border: 'solid',
          borderColor: '#ccc',
        }}
        src={url}
      ></tableau-viz>
    </div>
  );
};

export default TornadoDashboard;
