//uses web element from Tableau JavaScript Embedding API v3, requires script in index.html to work
const TableauDashboard = (props) => {
  const url =
    'https://public.tableau.com/views/TornadoesintheU_S_1950-2021Updated/Dashboard?:language=en-US&:display_count=n&:origin=viz_share_link';
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
        width='1024'
        height='795'
        style={{
          border: 'solid',
          borderColor: '#ccc',
        }}
        src={props.url}
      ></tableau-viz>
    </div>
  );
};

export default TableauDashboard;
