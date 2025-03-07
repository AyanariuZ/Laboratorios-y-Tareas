export const GifItem = ({ title, url, id }) => {
  return (
    <div className="card g-col-3 col-lg-2" style={{margin:5, padding:20}}>
      <img src={url} alt={title} />
      <p> {title} </p>
    </div>
  );
};
