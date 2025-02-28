export const Card = ({data}) => {
  return (
    
    <section  className="container">
        <h1 className="text-capitalize">
        {data.name}
      </h1>
      <img src={data.image} alt={data.name} style={{width: 150, height:150}}/> 
        <div className="wrapper">
             

        </div>
      
      {/*imagenes */}
      
      

    </section>
  );
};
