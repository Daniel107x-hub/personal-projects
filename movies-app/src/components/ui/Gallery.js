import "./Gallery.css";

function Gallery({ children }) {
  return (
    <section className="gallery flex items-center justify-center content-center">
      {children}
    </section>
  );
}

export default Gallery;
