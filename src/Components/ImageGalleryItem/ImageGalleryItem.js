import "./ImageGalleryItem.scss"

const ImageGalleryItem = ({id, src, alt, modsrc}) => (
    <li key={id} className="ImageGalleryItem">
        <img id={id} src={src} alt={alt} data-source={modsrc} className="ImageGalleryItem-image" />
    </li>
)

export default ImageGalleryItem;