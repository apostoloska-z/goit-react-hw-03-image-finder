import "./ImageGallery.scss"
import ImageGalleryItem from "../ImageGalleryItem";

const ImageGallery = ({images, onClick}) => (
    <ul className="ImageGallery" onClick={onClick}>
        {images.map(image => (
            <ImageGalleryItem
                id={image.id}
                src={image.webformatURL}
                alt={image.tags}
                modsrc={image.largeImageURL}
            />
        ))}
    </ul>
)

export default ImageGallery;